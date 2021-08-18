import axios from 'axios';
import { GET_COUNTRIES, GET_COUNTRIES_DETAIL, SEARCH_BY_NAME, GET_ACTIVITIES, CLEAR, SORT_BY_ALPHABET, SORT_BY_POPULATION, FILTER_BY_CONTINENT, FILTER_BY_ACTIVITY } from './ActionsNames';

export function getCountries (activity) {
    return async function(dispatch) {
        const response = await axios.get(`http://localhost:3001/countries`);
        dispatch({type: GET_COUNTRIES, payload: !response.data 
            ? [] 
            : activity 
            ? response.data.filter((el) =>
                el.activities.find((el) => el.name === activity)) : response.data});
    }
};
export function getDetail(id){
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/countries/${id}`);
        console.log(id, 'id')
        dispatch({type: GET_COUNTRIES_DETAIL, payload: response.data});
    }
};
export function searchByName(name){
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/countries?name=${name}`);
        dispatch({type: SEARCH_BY_NAME, payload: response.data});
    }
};
export function getActivities(){
    return async function (dispatch){
        const response = await axios.get(`http://localhost:3001/activities`);
        dispatch({type: GET_ACTIVITIES, payload: response.data})
    }
};
export function clear() {
    return {type: CLEAR}
};
export function sortByAlphabet(payload){
    return {type: SORT_BY_ALPHABET, payload: payload};
};
export function sortByPopulation(payload){
    return {type: SORT_BY_POPULATION, payload: payload}
};
export function filterByContinent(continent){
    return {type: FILTER_BY_CONTINENT, payload: continent}
};
export function filterByActivity(payload){
    return {type: FILTER_BY_ACTIVITY, payload}
};
// export function addActivity(name, difficulty, duration, season, countries) {
//     return async function (dispatch) {
//         const response = axios.post("activities", {
//             name,
//             difficulty,
//             duration,
//             season,
//             countries,
//         })
//         dispatch({type: CREATE_ACTIVITY, payload: response})
//     }
// };