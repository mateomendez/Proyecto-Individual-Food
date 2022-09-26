
const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: {},
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
            alert(payload)
            return {
                ...state,
            }
        case 'DETAIL_RECIPE': 
            return {
                ...state,
                detail: payload
            }
        case 'FILTER_BY_DIET':
            let dietDbFilter = payload === 'all' ? state.allRecipes : state.allRecipes.filter(recipe => recipe.diets.map(e => e.name).includes(payload))
            let dietFilter = payload === 'all' ? state.allRecipes : state.allRecipes.filter(recipe => recipe.diets.includes(payload))
            return {
                ...state,
                recipes: [...dietFilter, ...dietDbFilter]
            }
        case 'SET_ORDER':
            let setOrder = [];
            if (payload === "AscA") {
                setOrder = state.recipes.sort(function(a, b){
                     if(a.name > b.name) return 1;
                     if(b.name > a.name) return -1;
                     return 0
                })
            }
            if (payload === "DesA") {
                setOrder = state.recipes.sort(function(a, b){
                    if(a.name > b.name) return -1;
                    if(b.name > a.name) return 1;
                    return 0
                })
            }
            if(payload === 'Asc') {
                setOrder = state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore) return 1;
                    if(b.healthScore > a.healthScore) return -1;
                    return 0
                })
            }
            if(payload === 'Desc') {
                setOrder = state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore) return -1;
                    if(b.healthScore > a.healthScore) return 1;
                    return 0
                })
            }
            return {
                ...state,
                recipes: setOrder
            }
        default: return state
        }
}