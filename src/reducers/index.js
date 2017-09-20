import { combineReducers } from 'redux';
import RestaurantReducer from './reducer_restaurants';
import { reducer as formReducer } from 'redux-form';
import RecipeReducer from './reducer_recipes';
import EmployeesReducer from './reducer_employees';

// Application level store in React-Redux pattern
const rootReducer = combineReducers({
  restaurants: RestaurantReducer,
  form: formReducer,
  recipes: RecipeReducer,
  employees: EmployeesReducer
});

export default rootReducer;
