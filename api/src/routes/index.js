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
        const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=b9efb5473ccb401a9241802b68fabe07&number=4&addRecipeInformation=true')
        const apiData = await apiUrl.data.results.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            diets: recipe.diets.map(recipe => recipe[0].toUpperCase() + recipe.slice(1)),
            dishType: recipe.dishTypes.map(recipe => recipe),
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            steps: recipe.analyzedInstructions.steps
        }
    })
    // console.log(apiData)
    return apiData;

    
}

const getDbRecipes = async () => {
    return await Recipe.findAll({include : Diet})
    
}

const getAllRecipes = async () => {
    const apiData = await getApiRecipes();
    const dbData = await getDbRecipes();
    // console.log(dbData)
    const allRecipes = apiData.concat(dbData) 
    // console.log(allRecipes)
    return allRecipes;
}

const getAllDiets = async () => {
    const diets = [];
    const dietApi = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=b9efb5473ccb401a9241802b68fabe07&number=4&addRecipeInformation=true')
    // console.log(dietApi.data.results)
    const dietsArrays = dietApi.data.results.map(element => element.diets)
    // console.log(dietsArrays)
    for (let i = 0; i<dietsArrays.length;i++){
        for(let j=0; j<dietsArrays[i].length;j++){
            diets.push(dietsArrays[i][j])
        }
    }
    
    diets.forEach(element => {
        Diet.findOrCreate({
            where: {name: element}
        })
    })
    const allDiets = await Diet.findAll();
    // console.log(allDiets)
    return allDiets
}

// Vamos a hacer el GET y POST, en el tp lo hacemos separado en otro archivo

router.get('/recipes', async (req, res) => {
    const {name} = req.query;
    let recipes = await getAllRecipes();
    if(name) {
        let recipeName = recipes.filter(element => element.name.toLowerCase().includes(name.toLowerCase()))
        recipeName ? res.status(200).send(recipeName) : res.status(404).send('No existe una receta con ese nombre')
    }
    else {
        res.status(200).send(recipes)
    }
    // if(name) {
    //     let recipeName = recipes.filter(element => element.title.toLowerCase().includes(name.toLowerCase()));
    //     try {
    //         res.status(200).send(recipeName)
    //     } catch (error) {
    //         res.status(404).send(error.message)
    //     }
    // }
    // else {
    //     res.status(200).send(recipes)
    // }
})

router.get('/recipes/:id', async (req, res) => {
    const {id} = req.params;
    try { 
        const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=b9efb5473ccb401a9241802b68fabe07`)
        // console.log(recipe)
        res.status(200).send(recipe.data) 
    } catch (error) {
         res.status(404).send(`No se encontró la receta con el id ${id}`) }

})

router.post('/recipes', async (req,res) => {
    // console.log(req.body)
    let {name, summary, healthScore, image, diets, steps} = req.body;

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
    // console.log(dietDb)
    recipeCreated.addDiet(dietDb)
    res.send('Receta creada con éxito')
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
