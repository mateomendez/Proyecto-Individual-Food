
const initialState = {
    recipes: []
}

export default function rootReducer(state= initialState, payload, type){
    switch(type){
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: payload
            }
        //case default
    }
}