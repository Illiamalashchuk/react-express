import React, {Component} from 'react'
import axios from 'axios'
import './style.css'



class AddRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: ''
        }
    }
    handleNameChange = event => {
        this.setState({ name: event.target.value });
    }
    handleDescriptionChange = event => {
        this.setState({ description: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();
        if (!this.props.recipe) {
            axios.post(`http://localhost:5000/api/recipes`, { 
                name: this.state.name,
                description: this.state.description
            })
            .then(res => {
                console.log(res.data);
                this.props.reload()
                this.setState({ 
                    name: '',
                    description: ''
                });
            })
            setTimeout(function() {
                this.props.closeModal()
            }.bind(this), 500)
        } else {
            axios.put(`http://localhost:5000/api/recipes/${this.props.recipe._id}`, { 
                name: this.state.name,
                description: this.state.description
            })
            .then(res => {
                console.log(res.data);
                this.props.reload() // wrong con
                this.setState({ 
                    name: '',
                    description: ''
                });
            })
            setTimeout(function() {
                this.props.closeModal()

            }.bind(this), 500)
        }  
    }


    render() {
        var placeholder
        if (!this.props.recipe) {
            placeholder = {
                name: 'name',
                description: 'description'
            }
        } else {
            placeholder = {
                name: this.props.recipe.name,
                description: this.props.recipe.description
            }
        }
       return(
           <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <input
                            type="text" 
                            placeholder={placeholder.name} 
                            value={this.state.name} 
                            onChange={this.handleNameChange.bind(this)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder={placeholder.description}
                            value={this.state.description}
                            onChange={this.handleDescriptionChange.bind(this)}
                            className="form-control description" 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary float-right">Submit</button>
                </form>
           </div>
       )
    }
}



export default AddRecipe