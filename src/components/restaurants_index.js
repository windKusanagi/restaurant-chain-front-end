import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchRestaurants } from '../actions/';
import { Link } from 'react-router-dom';
import { Media, MediaBody, MediaHeading, MediaLeft, responsive } from 'react-bootstrap';
import GoogleMap from './google_map'

// Container for Restaurant List View
class RestaurantIndex extends Component {
    // Fetch restaurant data after the component is rendered
    componentDidMount() {
        this.props.fetchRestaurants();
    }

    // Recursively render Restaurant List Item accoring to 
    // the number of resturant 
    renderRestaurants() {
        return _.map(this.props.restaurants, restaurant => {
            return (
                <li className="list-group-item" key={restaurant.restaurantId}>
                    <Link to={`/restaurant/${restaurant.restaurantId}`}>
                    <Media>
                        <Media.Left>
                            <img width={100} height={100} alt="Image" src={restaurant.restaurantImage}
                                responsive />
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{restaurant.restaurantName}</Media.Heading>
                            <p style={RestaurantListItemFirstPTag}>Restaurant Location : {restaurant.restaurantLocation}</p>
                            <p>Restaurant Contact : {restaurant.restaurantContact}</p>
                        </Media.Body>
                    </Media>
                    </Link>
                </li>
            )
        })
    }
    // Render the restaurant list view
    render() {
        return (
            <div>
                <div className="row">
                    <h2 className="col-xs-6 col-xs-offset-1 col-md-3 col-md-offset-3"  > Restaurant List </h2>
                    
                    <Link className="btn btn-success col-xs-offset-1 col-md-offset-1" style={addRestaurantBtn} to="/restaurant/new">
                        Add Restaurant
                    </Link>      
                </div>
                <ul
                    className="list-group col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3"
                    style={restaurantsList}
                >
                    {this.renderRestaurants()}
                </ul>
            </div>
        );
    }
}

// map the recipes data in application level state to the props of 
// RestaurantIndex component
function mapStateToProps(state) {
    return { restaurants: state.restaurants };
}

// Connect the props (application level state) and fetchRestaurants action to 
// RestaurantIndex component
export default connect(mapStateToProps, { fetchRestaurants })(RestaurantIndex);

// Several JSX style
const restaurantsList = {
    marginTop: 10 + 'px'
};
const RestaurantListItemFirstPTag = {
    marginTop: 10 + 'px'
};

const addRestaurantBtn = {
    marginTop: 20 + 'px'
};
