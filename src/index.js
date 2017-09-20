import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import RestaurantIndex from './components/restaurants_index';
import RestaurantDetail from './components/restaurant_detail';
import RestaurantNew from './components/restaurant_new';
import RestaurantUpdate from './components/restaurant_update';

import RecipesIndex from './components/recipes_index';
import EmployeesIndex from './components/employees_index';

import NavbarComponent from './components/navbar';

// Apply redux middleware to this project, here use redux-promis to
// handle the promise data
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

// Render the projet, meanwhile define the routes
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

    <BrowserRouter>
      <div>
        <NavbarComponent />
        <Switch>
          <Route path="/employees" component={EmployeesIndex} /> 
          <Route path="/recipes" component={RecipesIndex} /> 
          <Route path="/restaurant/new" component={RestaurantNew} /> 
          <Route path="/restaurant/:id/update" component={RestaurantUpdate} /> 
          <Route path="/restaurant/:id" component={RestaurantDetail} /> 
          <Route path="/" component={RestaurantIndex} />  
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container-fluid'));
