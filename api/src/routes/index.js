const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const {Recipe} = require('../db');
const {Diet} = require('../db')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiRecipes = async () => {
        
        const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=35508bb831984b18b2c4b6fc18868a1e&number=100&addRecipeInformation=true')
        const apiData = await apiUrl.data.results.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            diets: recipe.diets.map(recipe => recipe[0].toUpperCase() + recipe.slice(1)),
            dishType: recipe.dishTypes.map(recipe => recipe),
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions.map(instructions => instructions.steps)
        }
    })
    return apiData;
}

const getDbRecipes = async () => {
    const recipes = await Recipe.findAll({include:Diet})
    return recipes.map(element => element.dataValues)
}

const getAllRecipes = async () => {
    const apiData = await getApiRecipes();
    const dbData = await getDbRecipes();
    const allRecipes = apiData.concat(dbData) 
    return allRecipes;
}

const getAllDiets = async () => {
    const dietsFiltered = [];
    const diets = [];
    const dietApi = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=35508bb831984b18b2c4b6fc18868a1e&number=100&addRecipeInformation=true')
    const dietsArrays = dietApi.data.results.map(element => element.diets)
    for (let i = 0; i<dietsArrays.length;i++){
        for(let j=0; j<dietsArrays[i].length;j++){
            diets.push(dietsArrays[i][j])
        }
    }
    const dietsMayus = diets.map(element => element[0].toUpperCase() + element.slice(1))
    dietsMayus.forEach(element => {
        Diet.findOrCreate({
            where: {name: element}
        })
    })
    const allDietsData = await Diet.findAll();
    const allDiets = allDietsData.map(element => element.dataValues.name[0].toUpperCase() + element.dataValues.name.slice(1))
    allDiets.forEach(element => {
        if(!dietsFiltered.includes(element)) {
            dietsFiltered.push(element)
        }
    })
    console.log(dietsFiltered)
    return dietsFiltered
}

router.get('/recipes', async (req, res) => {
    const {name} = req.query;
    const recipes = await getAllRecipes();
    if(name) {
        let recipeName = await recipes.filter(element => element.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length > 0 ? res.status(200).send(recipeName) : res.status(404).send('No existe una receta con ese nombre')
    }
    else {
        res.status(200).send(recipes)
    } 
})

router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params;
    const recipes = await getAllRecipes()
    let recipe = recipes.filter(element => String(element.id) === id)
    
        if(recipe[0].createdInDb) {
            recipe[0].diets = recipe[0].diets.map(element => element.dataValues.name)
            res.status(200).send(recipe[0])
        }
        else if(!recipe.createdInDb) {
            try {
                recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=35508bb831984b18b2c4b6fc18868a1e`)
                console.log(recipe.data)
                res.status(200).send(recipe.data) 
            }
            catch (e) {
                res.status(404).send(`No se encontró la receta con el id ${id}`)
            }
        }

})

router.post('/recipes', async (req,res) => {
    let {name, summary, healthScore, image, diets, steps, createdInDb} = req.body;
    const allRecipes = await getAllRecipes();
    const recipe = allRecipes.find(recipe => recipe.name === name)
    if(recipe) return res.status(200).send('This recipe already exists')
    let recipeCreated = await Recipe.create({
        name,
        summary,
        healthScore,
        steps,
        image,
        createdInDb
    })

    let dietDb = await Diet.findAll({
        where: { name : diets }
    })
    recipeCreated.addDiet(dietDb) 
    res.status(200).send('Recipe created succesfully') 
}) 

router.get('/diets', async (req, res) => {
    const allDiets = await getAllDiets();
    try {
        res.status(200).send(allDiets)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

module.exports = router;
