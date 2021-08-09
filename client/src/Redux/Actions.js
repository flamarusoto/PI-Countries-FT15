import axios from 'axios';
import { GET_COUNTRIES, GET_COUNTRIES_DETAIL, SEARCH_BY_NAME, GET_ACTIVITIES, CLEAR  } from './ActionsNames';

export function getCountries () {
    return async function(dispatch) {
        const response = await axios.get(`http://localhost:3001/countries`);
        dispatch({type: GET_COUNTRIES, payload: response.data});
    }
};
export function getDetail(id){
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/countries/${id}`);
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
        const response = await axios.get(`http://localhost:3001/genres`);
        dispatch({type: GET_ACTIVITIES, payload: response.data})
    }
};
export function clear() {
    return {type: CLEAR}
}