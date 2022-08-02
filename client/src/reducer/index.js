
const initialState = {
    recipes: [],
    allRecipes: [],
    recipeFilterByDiet: [],
    diets: [],
    detail: {},
    diet: "all",
    sort: "" 
}

export default function rootReducer(state = initialState, {type, payload}){
    switch(type){
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: payload,
                allRecipes: payload
            }
        case 'SEARCH_RECIPES':
            return {
                ...state,
                recipes: payload
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: payload
            }
        case 'POST_RECIPE':
            return {
                ...state,
            }
        case 'DETAIL_RECIPE': 
            return {
                ...state,
                detail: payload
            }
        case 'FILTER_BY_DIET':
            // let allRecipes = state.recipes;
            //  console.log(payload);
            // console.log(allRecipes)
            // console.log(state.recipes[0].diets)
            let dietFilter = payload === 'all' ? state.allRecipes : state.allRecipes.filter(recipe => recipe.diets.includes(payload))
            // console.log(dietFilter)
            // console.log(dietFilter.length)
            return {
                ...state,
                diet: payload,
                recipes: dietFilter,
                recipeFilterByDiet: dietFilter
            }
        case 'SET_ORDER':
            // console.log(payload)
            return {
                ...state,
                sort: payload
            }
        case 'FILTER_BY_ORDER':
            const unsortedRecipes = state.recipes
            let orderFilter = []
            console.log(state.sort)
            if(state.sort === 'Alphabetic') {
                console.log(state.sort)
                if(payload === 'Asc') {
                orderFilter = state.recipes.sort(function(a, b){
                    if(a.name > b.name) return 1;
                    if(b.name > a.name) return -1;
                    return 0
                })}
                if(payload === 'Desc') {
                orderFilter = state.recipes.sort(function(a, b){
                    if(a.name > b.name) return -1;
                    if(b.name > a.name) return 1;
                    return 0
                })}
                if(payload === 'Random') {
                    if(state.diet !== 'all') orderFilter = state.recipeFilterByDiet;
                    if(state.diet === 'all') orderFilter = state.allRecipes;
                    console.log(orderFilter)
                }
                } 
            if (state.sort === 'HealthScore') {
                
                console.log(state.sort)
                console.log(payload)
                if(payload === 'Asc') {
                    orderFilter = state.recipes.sort(function(a, b){
                        return a.healthScore - b.healthScore
                    })}
                if(payload === 'Desc') {
                    orderFilter = state.recipes.sort(function(a, b){
                        return b.healthScore - a.healthScore
                })}
                if(payload === 'Random') {
                    if(state.diet !== 'all') orderFilter = state.recipeFilterByDiet;
                    if(state.diet === 'all') orderFilter = state.allRecipes;
                    console.log(orderFilter)
                }
            }
            
            // if(state.sort === 'Random') {
            //     orderFilter = unsortedRecipes
            // }
            return {
                ...state,
                recipes: orderFilter
            }
        default: 
            return state
        //case default
    }
}