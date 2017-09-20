import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRestaurant } from '../actions/index';

// View to create a new restaurant, implemented based on redux-form
class RestaurantNew extends Component {
    // reusable function to define validate status for each Field, display error message
    // when errors are presented
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
    // Submit function implemented locally, create a createRestaurant
    // action to create a new entry in remote database, meanwhile give the 
    // callback functions for AJAX promise.
    onSubmit(values) {
        values.restaurantSales = JSON.parse(values.restaurantSales);
        this.props.createRestaurant(values, ()=>{
                this.props.history.push('/');
            }, 
            () => {
                alert('Post Failed!');
        });
    }
    // Render the create restaurant form
    render() {
        // handle the form submition to local method
        const { handleSubmit } = this.props;
        return (
            // render and define the form by using redux-form
            <form onSubmit = {handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Restaurant Name"
                    name="restaurantName"
                    component={this.renderField}
                />
                <Field
                    label="Restaurant Location"
                    name="restaurantLocation"
                    component={this.renderField}
                />
                <Field
                    label="Restaurant Contact"
                    name="restaurantContact"
                    component={this.renderField}
                />
                <Field
                    label="Restaurant Open Time"
                    name="restaurantOpenTime"
                    component={this.renderField}
                />
                <Field
                    label="Restaurant Close Time"
                    name="restaurantCloseTime"
                    component={this.renderField}
                />
                <Field
                    label="Restaurant Latitude"
                    name="restaurantLatitude"
                    component={this.renderField}
                />
                <Field
                    label="Restaurant Longtitude"
                    name="restaurantLongtitude"
                    component={this.renderField}
                />
                <Field
                    label="Restaurant Image URL"
                    name="restaurantImage"
                    component={this.renderField}
                />
                <Field
                    label="Restaurant Annual Sales"
                    name="restaurantSales"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary" disabled={this.props.invalid}>
                    Submit
                </button>
                <Link className="btn btn-danger" to="/" style={cancelBtnStyle}>
                    Cancel
                </Link>
                <br/>
                <br/>
            </form>
            
        )
    }
}
// Define validation method for each of the input field
function validate(values) {
    const errors = {};
    if (!values.restaurantName) {
        errors.restaurantName = "Enter a Name!";
    }
    if (!values.restaurantLocation) {
        errors.restaurantLocation = "Enter some Location!";
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
    if (!values.restaurantLongtitude) {
        errors.restaurantLongtitude = "Enter a restaurant longtitude";
    }
    if (!values.restaurantLatitude) {
        errors.restaurantLatitude = "Enter a restaurant longtitude";
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

// Since this component don't need application level 
// state, so just bind the action creator and redux-form
// to this component
export default reduxForm({
    validate,
    form: 'RestaurantNewForm'
})(
    connect (null, {createRestaurant})(RestaurantNew)
);
