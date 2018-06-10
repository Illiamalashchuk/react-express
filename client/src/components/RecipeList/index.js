import React, {PureComponent} from 'react'
import Recipe from '../Recipe'
import './style.css'

class RecipeList extends PureComponent {
    render() {
        const self = this.props.self
        const reload = this.props.reload
        const recipeElements = this.props.recipes.map((recipe, index) =>
            <li key={recipe._id} className="recipe-list__li">
                <Recipe 
                    recipe = {recipe}           
                    reload={reload.bind(self)} // push inside for getting all recipes after updating/removing one
                    self={self}                // with context(this context`s parent is App)
                />
            </li>)
        return (
            <ul className="recipe-list__ul">
                {recipeElements}
            </ul>
        )
    }
}


export default RecipeList