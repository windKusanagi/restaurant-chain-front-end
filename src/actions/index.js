import axios from 'axios';

// List of action types
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const FETCH_RESTAURANT = 'FETCH_RESTAURANT';
export const CREATE_RESTAURANT = 'CREATE_RESTAURANT';
export const DELETE_RESTAURANT = 'DELETE_RESTAURANT';
export const UPDATE_RESTAURANT = 'UPDATE_RESTAURANT';
export const LOAD_RESTAURANT_FORM = 'LOAD_RESTAURANT_FORM';
export const FETCH_RECIPES = 'FETCH_RECIPES';
export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';

// List of common URL
const ROOT_URL = "http://localhost:8000/api/restaurants";
const RECIPE_ROOT_URL ="http://localhost:8000/api/recipes";
const EMPLOYEES_ROOT_URL ="http://localhost:8000/api/employees";

// Actions' list in React-Redux pattern

export function fetchRestaurants() {
    // Use axios to fire a AJAX XMLHttpRequest
    const request = axios.get(ROOT_URL);
    return {
        type: FETCH_RESTAURANTS,
        payload: request
    };
}

export function fetchRestaurant(id) {
    const request = axios.get(`${ROOT_URL}/${id}`);

    return {
        type: FETCH_RESTAURANT,
        payload: request
    }
}

export function createRestaurant(values, callback, failure) {
    const sendData = {}
    sendData.data = values;
    // Promise and callback functions
    const request = axios.post(`${ROOT_URL}/`, sendData)
        .then ( () => callback())
        .catch( () => failure());

    return {
        type: CREATE_RESTAURANT,
        payload: request
    }
}

export function deleteRestaurant(id, callback, failure) {
    const request = axios.delete(`${ROOT_URL}/${id}`)
        .then ( () => callback())
        .catch( () => failure());

    return {
        type: DELETE_RESTAURANT,
        payload: id
    }
}

export function updateRestaurant(id, values, callback, failure) {
    const sendData = {}
    sendData.data = values;
    const request = axios.put(`${ROOT_URL}/${id}/`, sendData)
        .then ( () => callback())
        .catch( () => failure());

    return {
        type: CREATE_RESTAURANT,
        payload: request
    }
}


export function loadForm(data) {
    return {
        type: LOAD_RESTAURANT_FORM,
        payload: data
    }
}

export function fetchRecipes() {
    const request = axios.get(RECIPE_ROOT_URL);
    return {
        type: FETCH_RECIPES,
        payload: request
    };
}

export function fetchEmployees() {
    const request = axios.get(EMPLOYEES_ROOT_URL);
    return {
        type: FETCH_EMPLOYEES,
        payload: request
    };
}