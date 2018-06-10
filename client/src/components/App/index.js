import React, {Component} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import RecipeList from '../RecipeList'
import Modal from '../Modal'
import './style.css'




class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [], // save all recipes
            isOpen: false // state for modal window
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/recipes/`) // get recipes
        .then(res => {
            const recipes = res.data;
            this.setState({ recipes });
        });
    }
    handleClick() { // change the state of modal window
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="app-title">Cookbook</h1>
                    <div className="clearfix">
                    </div>
                    <button className="btn btn-success btn-lg float-right add-recipe" onClick={this.handleClick.bind(this)}>Add new recipe</button>
                    <div className="clearfix"></div>
                </div>
                <RecipeList 
                    reload={this.componentDidMount} // move this f to the nex component
                    self={this}                     // with context
                    recipes={this.state.recipes} />
                <Modal 
                    isOpen={this.state.isOpen}
                    onButtonClick = {this.handleClick.bind(this)} // move this f to close modal from itself
                    context={this}                                // with it`s context
                    reload={this.componentDidMount.bind(this)}    // move for getting all recipes after posting
                    title = {'Create new recipe'}
                />
            </div>
        )
    }
}


export default App