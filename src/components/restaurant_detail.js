import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRestaurant, deleteRestaurant } from '../actions/index';
import { Link } from 'react-router-dom';
import GoogleMap from './google_map'
import { Media, MediaBody, MediaHeading, MediaLeft, responsive } from 'react-bootstrap';
import SparkLines from '../components/spark_lines';

// Container View for restaurant detail data
class RestaurantDetail extends Component {
    // Fetch restaurant detail data from remote server
    componentDidMount() {
        // If the restaurant data is not define, fetch the data
        if (!this.props.restaurant) {
            const { id } = this.props.match.params;
            this.props.fetchRestaurant(id);
        }
    }
    // Create a deleteRestaurant action, meanwhile define the callback 
    // function when the promise is successful/failure
    onDelete() {
        const { id } = this.props.match.params;
        this.props.deleteRestaurant(id, () => {
            this.props.history.push('/');
            }, 
            () => {
                alert('Delete Failed!');
        });
    }
    // Event triggered function to navigate to update view
    onUpdate() {
        const { id } = this.props.match.params;
        this.props.history.push(`/restaurant/${id}/update`);
    }

    // Render sparkline view
    renderSparkLines(sales) {
        return (
            <SparkLines data={sales} color="orange" />
        );
    }

    render() {

        const { restaurant } = this.props;
        // if the restaurant data is not presented, return loading...
        if (!restaurant) {
            return (
                <div> Loading... </div>
            );
        }

        const { sales } = restaurant.restaurantSales;
        const lat = restaurant.restaurantLatitude;
        const lng = restaurant.restaurantLongtitude;
        // render restaurant detail view, googlemap view and sparkline view
        return (
            <div>
                <button className="btn btn-primary col-md-3 col-md-offset-2" to="/" onClick={this.onUpdate.bind(this)}> 
                    Update This Restaurant
                </button>
                <button className="btn btn-danger col-xs-offset-1  col-md-3 col-md-offset-2" onClick={this.onDelete.bind(this)}>
                    Delete This Restaurant
                </button>
                
                <br/>
                <br/>
                <h2 className="text-center" style={RestaurantName}> {restaurant.restaurantName} </h2>

                <Media className="center-block col-md-10 col-md-offset-1">
                    <Media.Left align="middle">
                        <img width={150} height={150} src={restaurant.restaurantImage} alt="Image" />
                    </Media.Left>
                    <Media.Body className="text-center">
                        <h3> Restaurant Serial Code: {restaurant.restaurantId}</h3>
                        <hr />
                        <h3 style={RestaurantDetailMargin}> Location: {restaurant.restaurantLocation} </h3>
                        <hr />
                        <h3 style={RestaurantDetailMargin}> Contact: {restaurant.restaurantContact} </h3>
                        <hr />
                        <h4 style={RestaurantDetailMargin}> Open From : {restaurant.restaurantOpenTime} </h4>
                        <h4 style={RestaurantDetailMargin}> Clost At: {restaurant.restaurantCloseTime} </h4>
                        <hr />
                    </Media.Body>
                </Media>
                <br />
                <table className="table">
                    <tbody>
                        <tr>
                            <td ><GoogleMap lat={lat} lng={lng}/></td>       
                        </tr>
                        <tr>
                            <td>{this.renderSparkLines(sales)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}
// map the restaurants data in application level state to the props of 
// RestaurantDetail component, and get target restaurant and map it to this.props
function mapStateToProps({ restaurants }, ownProps) {
    return { restaurant: restaurants[ownProps.match.params.id] }
}

// Connect the action creator and the props item from application level state 
// to the RestaurantDetail View, then the fetchRestaurant and deleteRestaurant 
// actions and the restaurant's data are available to this.props
export default connect(mapStateToProps, { fetchRestaurant, deleteRestaurant })(RestaurantDetail);

const RestaurantName = {
    marginBottom: 20 + 'px'
};

const RestaurantDetailMargin = {
    marginTop: 15 + 'px'
};
