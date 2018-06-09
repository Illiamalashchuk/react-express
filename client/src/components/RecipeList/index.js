import React, {PureComponent} from 'react'
import Recipe from '../Recipe'
import './style.css'

class RecipeList extends PureComponent {
    state ={
        recipes: null
    }
    render() {
        const recipeElements = this.props.recipes.map((recipe, index) =>
            <li key={recipe._id} className="article-list__li">
                <Recipe recipe = {recipe}/>
            </li>)
        return (
            <ul>
                {recipeElements}
            </ul>
        )
    }
}


export default RecipeList