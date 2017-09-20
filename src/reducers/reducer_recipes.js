import { FETCH_RECIPES } from '../actions/index';
import _ from 'lodash';

// Reducer for recipe-related action
export default function( state = {}, action) {
    switch(action.type) {
        case FETCH_RECIPES:
            // return a dict instead of an array
            return _.mapKeys(action.payload.data, 'recipeId')

    default:
        return state;
    }
} 