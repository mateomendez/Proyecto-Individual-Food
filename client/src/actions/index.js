import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        try {    
            var json = await axios.get('https://proyectoindividual-food-henry.herokuapp.com/recipes')
            return dispatch({
                type: 'GET_RECIPES',
                payload: json.data
            })
        } catch (error) {
        console.log("No esta funcionando")
        }
    }
}

export function searchRecipes(payload) {
    return async function (dispatch) {
         try {
            var json = await axios.get("https://proyectoindividual-food-henry.herokuapp.com/recipes?name=" + payload)
            return dispatch ({
                type: 'SEARCH_RECIPES',
                payload: json.data
            })
         } catch (error) {
             alert("No existe una receta con ese nombre")
         }
        
    }
}

export function getDiets() {
    return async function (dispatch) {
        let json = await axios.get("https://proyectoindividual-food-henry.herokuapp.com/diets")
        return dispatch({
            type:"GET_DIETS",
            payload: json.data
        })
    }
}

export function postRecipe(payload) {
    return async function (dispatch) {
        var json = await axios.post('https://proyectoindividual-food-henry.herokuapp.com/recipes', payload);
        return dispatch({
            type:"POST_RECIPE",
            payload:json.data
        })
    }
}

export function filterRecipesByDiet(payload){
    return{
        type:"FILTER_BY_DIET",
        payload
    }
}

export function setOrder(payload) {
    return {
        type:"SET_ORDER",
        payload
    }
}

export function detailRecipe(payload){
    return async function (dispacth) {
        try{
            let json = await axios.get('https://proyectoindividual-food-henry.herokuapp.com/recipes/' + payload)
            return dispacth ({
                type : "DETAIL_RECIPE",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}