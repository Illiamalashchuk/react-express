import React, {PureComponent} from 'react'
import Modal from '../Modal/index'
import './style.css'
import axios from 'axios'


class Recipe extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }
    handleClick() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleDeleteClick() {
        axios.delete(`http://localhost:5000/api/recipes/${this.props.recipe._id}`)
        .then(res => {
            console.log(res.data);
            this.props.reload()
        })
    }

    
    render() {
        const {recipe} = this.props
        const self = this.props.self
        const reload = this.props.reload
        return (
            <div className="card mx-auto" style={{width: '70%'}}>
                <div className="card-header">
                    <h2>
                        {recipe.name}                        
                    </h2>
                    <h6 className="card-subtitle text-muted date-string">
                        <span className="date-string__text">creation date: </span>{(new Date(recipe.date)).toDateString()}
                    </h6>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <section className="recipe-text">{recipe.description}</section>
                        <button className="btn btn-primary btn-sm float-right" onClick={this.handleClick.bind(this)}>Edit</button>
                        <button className="btn btn-danger btn-sm float-right delete-button" onClick={this.handleDeleteClick.bind(this)}>Delete</button>
                    </div>
                </div>
                <Modal 
                    isOpen={this.state.isOpen}
                    onButtonClick = {this.handleClick.bind(this)}
                    recipe = {recipe}
                    title = {`Edit recipe - ${recipe.name}`}
                    reload={reload} 
                    self={self}
                />  
            </div> 
        )
    }

}



export default Recipe