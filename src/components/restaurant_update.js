import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateRestaurant } from '../actions/index';
import { change } from 'redux-form';

// Container for updating a restaurant
class RestaurantUpdate extends Component {
    // reusable component for checking errors in each field,
    // if error is presented, display error message
    renderField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-group ${ touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''} 
                </div>
            </div>
        );
    }
    // local method to handel form submit event, fetch some of 
    // the restaurant data from props, combine with the data collect from
    // input field, then create a updateRestaurant action, meanwhile
    // define callback function for AJAX promise 
    onSubmit(values) {
        const { restaurant } = this.props;
        const updateData = {};
        updateData.restaurantLocation = restaurant.restaurantLocation;
        updateData.restaurantLatitude = restaurant.restaurantLatitude;
        updateData.restaurantLongtitude = restaurant.restaurantLongtitude;
        updateData.restaurantName = values.restaurantName;
        updateData.rrestaurantContact = values.restaurantContact;
        updateData.restaurantImage = values.restaurantImage;
        updateData.restaurantOpenTime = values.restaurantOpenTime;
        updateData.restaurantCloseTime = values.restaurantCloseTime;
        updateData.restaurantSales = JSON.parse(values.restaurantSales);
        const { id } = this.props.match.params;
        this.props.updateRestaurant(id, updateData, ()=>{
                this.props.history.push(`/restaurants/${id}`);
            }, 
            () => {
                alert('Update Failed!');
        });
    }

    // Render the update view
    render() {
        const { handleSubmit } = this.props;
        const { restaurant } = this.props;
        return (
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="New Restaurant Name"
                    name="restaurantName"
                    component={this.renderField}
                />
                <Field
                    label="New Restaurant Contact"
                    name="restaurantContact"
                    component={this.renderField}
                />
                <Field
                    label="New Restaurant Open Time"
                    name="restaurantOpenTime"
                    component={this.renderField}
                />
                <Field
                    label="New Restaurant Close Time"
                    name="restaurantCloseTime"
                    component={this.renderField}
                />
                <Field
                    label="New Restaurant Image URL"
                    name="restaurantImage"
                    component={this.renderField}
                />
                <Field
                    label="New Restaurant Annual Sales"
                    name="restaurantSales"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary" disabled={this.props.invalid}>
                    Update
                </button>
                <Link className="btn btn-danger" to={`/restaurant/${this.props.restaurant.restaurantId}`} style={cancelBtnStyle}>
                    Cancel
                </Link>
            </form>
        )
    }
}
// Define validation method for each input field
function validate(values) {
    const errors = {};
    if (!values.restaurantName) {
        errors.restaurantName = "Enter a Name!";
    }

    if (!values.restaurantContact) {
        errors.restaurantContact = "Enter a Contact!";
    }
    if (!values.restaurantOpenTime) {
        errors.restaurantOpenTime = "Enter a open time!";
    }
    if (!values.restaurantCloseTime) {
        errors.restaurantCloseTime = "Enter a close time!";
    }

    if (!values.restaurantImage) {
        errors.restaurantImage = "Enter an image URL";
    }
    if (!values.restaurantSales) {
        errors.restaurantSales = "Enter an JSON obj which contains an array, exp: {'sales': [200, 300, 200, 300, 200, 300, 200, 300, 200, 300, 200, 300]}";
    }

    return errors;
}

// A simple JSX style
const cancelBtnStyle = {
    marginLeft: 10+'px'
};

// map the restaurants data in application level state to the props of 
// RestaurantUpdate component, and get target restaurant and map it to this.props
function mapStateToProps({ restaurants }, ownProps) {
    return { restaurant: restaurants[ownProps.match.params.id]}
}

// Connect the action creator,redux-form and the props item from application level state 
// to the RestaurantDetail View, then the updateRestaurant 
// action and the restaurant's data are available to this.props
export default reduxForm({
    validate,
    form: 'RestaurantUpdateForm'
})(
    connect (mapStateToProps, {updateRestaurant})(RestaurantUpdate)
);
