
const initialState = {
    recipes: [],
    allRecipes: [],
    sort: "Random"
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
        case 'FILTER_BY_DIET':
            const allRecipes = state.recipes;
            let dietFilter = [];
            console.log(payload);
            console.log(allRecipes)
            if (payload === 'all') {
                dietFilter = allRecipes
            }  else {
                dietFilter = allRecipes.filter(recipe => recipe.diets.includes(payload))
            } 
            console.log(dietFilter)
            console.log(dietFilter.length)
            return {
                ...state,
                recipes: dietFilter
            }
        case 'SET_ORDER':
            return {
                ...state,
                sort: payload
            }
        case 'FILTER_BY_ORDER':
            var orderFilter = []
            if(state.sort === 'Alphabetic') {
                if(payload === 'Asc') {
                orderFilter = state.recipes.sort(function(a, b){
                    if(a.name > b.name) return 1;
                    if(b.name > a.name) return -1;
                    return 0
                })
                if(payload === 'Desc') {
                orderFilter = state.recipes.sort(function(a, b){
                    if(a.name > b.name) return -1;
                    if(b.name > a.name) return 1;
                    return 0
                })
                }
                }
                }
                
            if (state.sort === 'HealthScore') {
                if(payload === 'Asc') {
                    orderFilter = state.recipes.sort(function(a, b){
                        if(a.healthScore > b.healthScore) return 1;
                        if(b.healthScore > a.healthScore) return -1;
                        return 0
                    })
                    if(payload === 'Desc') {
                        orderFilter = state.recipes.sort(function(a, b){
                        if(a.healthScore > b.healthScore) return -1;
                        if(b.healthScore > a.healthScore) return 1;
                        return 0
                    })
                }
            }
            }
                    if(state.sort === 'Random') {
                        orderFilter = state.recipes
                    }
            return {
                ...state,
                recipes: orderFilter
            }
        default: 
            return state
        //case default
    }
}