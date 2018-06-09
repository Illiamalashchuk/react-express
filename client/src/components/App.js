import React, {Component} from 'react'
import RecipeList from './RecipeList'
// import AddRecipe from './AddRecipe'
import Modal from './Modal/index'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            isOpen: false
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/recipes/`)
        .then(res => {
            const recipes = res.data;
            this.setState({ recipes });
        });
    }
    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        console.log('app render')
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Cookbook</h1>
                    <div className="clearfix">
                        <button className="btn btn-success btn-lg float-right" onClick={this.handleClick.bind(this)}>Add new recipe</button>
                    </div>
                    {/* <AddRecipe reload = {this.componentDidMount.bind(this)}/>
                    onButtonClick = {this.handleClick.bind(this, article.id)} */}
                </div>
                <RecipeList recipes={this.state.recipes} />
                <Modal 
                    isOpen={this.state.isOpen}
                    onButtonClick = {this.handleClick.bind(this)}
                    reload={this.componentDidMount.bind(this)}
                    title = {'Create new recipe'}
                />
            </div>
        )
    }
}


export default App