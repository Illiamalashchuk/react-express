import React, {PureComponent} from 'react'
import Modal from '../Modal/index'
import './article-style.css'
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
            console.log(res);
            console.log(res.data);
        })
    }

    
    render() {
        const {recipe} = this.props
        return (
            <div className="card mx-auto" style={{width: '70%'}}>
                <div className="card-header">
                    <h2>
                        {recipe.name}                        
                    </h2>
                    <h6 className="card-subtitle text-muted">
                        create date: {(new Date(recipe.date)).toDateString()}
                    </h6>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <section className="article-text">{recipe.description}</section>
                        <button className="btn btn-primary btn-sm float-right" onClick={this.handleClick.bind(this)}>Edit</button>
                        <button className="btn btn-danger btn-sm float-right" onClick={this.handleDeleteClick.bind(this)}>Delete</button>
                    </div>
                </div>
                <Modal 
                    isOpen={this.state.isOpen}
                    onButtonClick = {this.handleClick.bind(this)}
                    recipe = {recipe}
                    title = {`Edit recipe - ${recipe.name}`}
                />  
            </div> 
        )
    }

}



export default Recipe