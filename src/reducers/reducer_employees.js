import { FETCH_EMPLOYEES } from '../actions/index';
import _ from 'lodash';

// Reducer for employee-related action
export default function( state = {}, action) {
    switch(action.type) {
        case FETCH_EMPLOYEES:
            // return a dict instead of an array, key is id
            return _.mapKeys(action.payload.data, 'employeeId')

    default:
        return state;
    }
} 