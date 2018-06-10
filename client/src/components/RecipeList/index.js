import React, {PureComponent} from 'react'
import Recipe from '../Recipe'
import './style.css'

class RecipeList extends PureComponent {
    render() {
        const self = this.props.self
        const reload = this.props.reload
        const recipeElements = this.props.recipes.map((recipe, index) =>
            <li key={recipe._id} className="article-list__li">
                <Recipe recipe = {recipe} reload={reload.bind(self)} self={self}/>
            </li>)
        return (
            <ul>
                {recipeElements}
            </ul>
        )
    }
}


export default RecipeList