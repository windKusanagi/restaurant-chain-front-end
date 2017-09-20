import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchRecipes } from '../actions/';
import { Link } from 'react-router-dom';
import { Carousel, CarouselCaption, CarouselItem } from 'react-bootstrap';



// Container for Recipes View, based on Carousel module imported from 
// react-bootstrap

class RecipesIndex extends Component {

    // Fetch data from server after the component is rendered.
    componentDidMount() {
        this.props.fetchRecipes();
    }

    // recursively render Carousel Item according to the number of reccipes
    renderCarousel() {
        // ES6 grammar to get recipes state from component props
        const {recipes} = this.props;
        // lodash map function to get each recipe in recipe list and render Carousel Item
        return _.map(recipes, recipe => {
            return (
                <Carousel.Item key={recipe.recipeId}>
                    <img width={900} height={500} alt="900x500" src={recipe.recipeImagepath} />
                    <Carousel.Caption>
                        <h2 style={FoodName}> {recipe.recipeName} </h2>
                        <h3 > {`$${recipe.recipePrice}`} </h3>
                        <p> {recipe.recipeDescription} </p>
                    </Carousel.Caption>
                </Carousel.Item>
  
            ); 
        })
    }

    render() {
        const { recipes } = this.props;
        // async recipes data comes from remote server (Promise based) 
        // if recipes is not defined, then return 'Loading...'
        if (!recipes){
            return  (
                <div>
                    <br/>
                    <br/>
                    <div>Loading ... </div>
                </div>
            )
        }
        // if recipes data is ready, render the Carsouel View
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <Carousel>
                    {this.renderCarousel()}
                </Carousel>
            </div>
        );
    }
}

// map the recipes data in application level state to the props of 
// RecipeIndex component
function mapStateToProps(state) {
    return { recipes: state.recipes };
}

// Connect the action creator and the props item from application level state 
// to the RecipeIndex View, then the fetchRecipes action and the recipes' data 
// is available to this.props
export default connect(mapStateToProps, { fetchRecipes })(RecipesIndex);

// Simple JSX style for food title
const FoodName = {
    color: 'orange'
}