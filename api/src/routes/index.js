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
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=b9efb5473ccb401a9241802b68fabe07&number=100&addRecipeInformation=true')
    
    const apiData = await apiUrl.data.results.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            diets: recipe.diets.map(recipe => recipe[0].toUpperCase() + recipe.slice(1) + ' - '),
            dishType: recipe.dishTypes.map(recipe => recipe),
            summary: recipe.summary,
            healthScore: recipe.healthScore,
             instructions: recipe.analyzedInstructions.steps
        }
    })
    // console.log(apiData)
    return apiData;
    
}

const getDbRecipes = async () => {
    return await Recipe.findAll()
}

const getAllRecipes = async () => {
    const apiData = await getApiRecipes();
    const dbData = await getDbRecipes();
    const allRecipes = apiData.concat(dbData)
    // console.log(allRecipes)
    return allRecipes;
}

// Vamos a hacer el GET y POST, en el tp lo hacemos separado en otro archivo

router.get('/recipes', async (req, res) => {
    const {name} = req.query;
    let recipes = await getAllRecipes();
    console.log(recipes)
    if(name) {
        let recipeName = recipes.filter(element => element.title.toLowerCase().includes(name.toLowerCase()))
        recipeName ? res.status(200).send(recipeName) : res.status(404).send('No existe una receta con ese nombre')
    }
    else {
        res.status(200).send(recipes)
    }
})

router.get('/recipes/:id', (req, res) => {
    const {id} = req.params;
    const allRecipes = getAllRecipes();
    if(id) {
        let recipe = allRecipes.filter(element => element.id === id)
        recipe ? res.status(200).send(recipe) : res.status(404).send(`No se encontró la receta con el id ${id}`)
    }
})

router.post('/recipes', (req,res) => {
    const {name, summary, healthScore, instructions, diets, image} = req.body;

    let recipeCreated = Recipe.create({
        name,
        summary,
        healthScore,
        instructions,
        image
    })

    let dietDb = Diet.findAll({
        where: {name:diets}
    })

    recipeCreated.addDiet(dietDb)
    res.send('Receta creada con éxito')
}) 

router.get('/diets', (req, res) => {
    const diets = [];
    const dietApi = axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=b9efb5473ccb401a9241802b68fabe07&addRecipeInformation=true')
    const dietsArrays = dietApi.data.map(element => element.diets)
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
    const allDiets = Diet.findAll();
    res.send(allDiets)
})

module.exports = router;
