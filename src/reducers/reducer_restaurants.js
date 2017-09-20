import { FETCH_RESTAURANTS, FETCH_RESTAURANT, DELETE_RESTAURANT } from '../actions';
import _ from 'lodash';

// Reducer for restaruant-related action
export default function( state = {}, action) {
    switch(action.type) {
        case FETCH_RESTAURANTS:
            // return a dict instead of an array, key is id
            return _.mapKeys(action.payload.data, 'restaurantId')
    
            
        case FETCH_RESTAURANT:
            // return a merged state (orgin state and the new coming restaurant key-value pair)
            return { ...state, [action.payload.data.restaurantId]: action.payload.data };

        case DELETE_RESTAURANT:
            // return a new state whitout deleted restaruant
            return _.omit(state, action.payload);

    default:
        return state;
    }
} 