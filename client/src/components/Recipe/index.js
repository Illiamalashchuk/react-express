import React, {PureComponent} from 'react'
import Modal from '../Modal/index'
import './style.css'
import axios from 'axios'


class Recipe extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false // state of modal window
        }
    }
    handleClick() { // open/close modal window
        this.setState({
            isOpen: !this.state.isOpen // change modal window`s state
        });
    }
    handleDeleteClick() {           // delete recipe
        axios.delete(`http://localhost:5000/api/recipes/${this.props.recipe._id}`)
        .then(res => {
            console.log(res.data);
            this.props.reload() // get all recipes and push them in recipes[] in App
        })
    }

    render() {
        const {recipe} = this.props
        const self = this.props.self // context from App
        const reload = this.props.reload // get recipes function from App
        return (
            <div className="card mx-auto">
                <div className="card-header">
                    <h2 className="recipe-name">
                        {recipe.name}                        
                    </h2>
                    <h6 className="card-subtitle text-muted date-string">
                        <span className="date-string__text">creation date: </span>{(new Date(recipe.date)).toDateString()}
                    </h6>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <section className="recipe-text">{recipe.description}</section>
                        <button className="btn btn-primary btn-sm float-right edit-button" onClick={this.handleClick.bind(this)}>Edit</button>
                        <button className="btn btn-danger btn-sm float-right delete-button" onClick={this.handleDeleteClick.bind(this)}>Delete</button>
                    </div>
                </div>
                <Modal 
                    isOpen={this.state.isOpen} 
                    onButtonClick = {this.handleClick.bind(this)} // closing modal func
                    recipe = {recipe}
                    title = {`Edit recipe - ${recipe.name}`}
                    reload={reload} // getting recipes (App)
                    self={self}    // context (App)
                />  
            </div> 
        )
    }

}



export default Recipe