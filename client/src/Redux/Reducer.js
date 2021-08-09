import { GET_COUNTRIES } from "./ActionsNames";

const initialState = {
    countries: []
}

function reducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES: return{
            ...state,
            countries: action.payload
        };
        default: 
        return state
    }
}

export default reducer;