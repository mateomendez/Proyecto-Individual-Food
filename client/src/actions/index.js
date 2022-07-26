import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        try {    
        let json = await axios.get('http://localhost:3001/recipes')
            return dispatch({
                type: 'GET_RECIPES',
                payload: json.data
            })
        } catch (error) {
        console.log(error)
        }
    }
}

export function searchRecipes(payload) {
    return async function (dispatch) {
         try {
            var json = await axios.get("http://localhost:3001/recipes?name=" + payload)
            return dispatch ({
                type: 'SEARCH_RECIPES',
                payload: json.data
            })
         } catch (error) {
             console.log(error)
             
         }
        
    }
}

export function getDiets() {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/diets")
        return dispatch({
            type:"GET_DIETS",
            payload: json.data
        })
    }
}

export function postRecipe(payload) {
    return async function (dispatch) {
        let json = await axios.post('http://localhost:3001/recipes', payload);
        return json;
    }
}

export function filterRecipesByDiet(payload){
    return{
        type:"FILTER_BY_DIET",
        payload
    }
}

export function setOrderRecipes(payload) {
    return {
        type:"SET_ORDER",
        payload
    }
}

export function filterRecipesByOrder(payload) {
    return {
        type: "FILTER_BY_ORDER",
        payload
    }
}