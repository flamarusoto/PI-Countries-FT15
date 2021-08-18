import { CLEAR, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_ACTIVITIES, GET_COUNTRIES, GET_COUNTRIES_DETAIL, SEARCH_BY_NAME, SORT_BY_ALPHABET, SORT_BY_POPULATION } from "./ActionsNames";

const initialState = {
    countries: [],
    countriesToShow: [],
    detail: {},
    activities: []
}

function reducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES: return{
            ...state,
            countries: action.payload,
            countriesToShow: action.payload
        };
        case SEARCH_BY_NAME: return {
            ...state,
            countries: action.payload
        };
        case GET_COUNTRIES_DETAIL: return {
            ...state,
            detail: action.payload
        };
        case GET_ACTIVITIES: return {
            ...state, 
            activities: action.payload
        };
        case CLEAR: return {
            countries: []
        };
        case FILTER_BY_ACTIVITY: 
        //countriesBackup = countriesToShow
        //activitiesList = activities
        // const countries2 = state.countriesBackup;
        //     let countriesByActivity = [];
        //     if (action.payload === "all") {
        //         countriesByActivity = countries2;
        //     } else {
        //         countriesByActivity = state.activitiesList.filter(activity => activity.name === action.payload)[0].countries.map(countryWithActivity => countryWithActivity)
        //     }
        //     return {
        //         ...state,
        //         countries: countriesByActivity
        //     }
            if(!action.payload) return {...state, countries: state.countriesToShow }
            return {
            ...state, 
            countries: state.countriesToShow.filter((el) =>{
                return el.activities.some((el) => el.name === action.payload)} )
        };
        case FILTER_BY_CONTINENT: {
            if (!action.payload) return { ...state, countries: state.countriesToShow };
            return {
                ...state,
                countries: state.countriesToShow.filter(e => e.continent.includes(action.payload))
            }
        };
        case SORT_BY_ALPHABET: { 
          if (!action.payload) return { ...state, countries: [...state.countries].sort((a, b) => a.added < b.added ? 1 : -1) }
          if (action.payload === 'az') return { ...state, countries: [...state.countries].sort((a, b) => a.name > b.name ? 1 : -1) }
          return { ...state, countries: [...state.countries].sort((a, b) => a.name > b.name ? -1 : 1) }
        };
        case SORT_BY_POPULATION:  {
            if (!action.payload) return { ...state, countries: [...state.countries].sort((a, b) => a.added < b.added ? 1 : -1) }
            if (action.payload === 'less') return { ...state, countries: [...state.countries].sort((a, b) => a.population > b.population ? 1 : -1) }
            return { ...state, countries: [...state.countries].sort((a, b) => a.population > b.population ? -1 : 1) }
        };
        // case CREATE_ACTIVITY: return {
        //     ...state, 
        //     activities: state.activities.concat(action.payload)
        // };

        default: 
        return state
    }
}

export default reducer;