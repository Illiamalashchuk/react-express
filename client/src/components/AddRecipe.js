import React, {Component} from 'react'
import axios from 'axios'



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
                console.log(res);
                console.log(res.data);
                this.props.reload()
                this.setState({ 
                    name: '',
                    description: ''
                });
            })
            console.log(this)
            setTimeout(function() {
                this.props.closeModal()

            }.bind(this), 500)
        } else {
            axios.put(`http://localhost:5000/api/recipes/${this.props.recipe._id}`, { 
                name: this.state.name,
                description: this.state.description
            })
            .then(res => {
                console.log(res);
                console.log(res.data);
                //this.props.reload() // wrong context
                
                this.setState({ 
                    name: '',
                    description: ''
                });
            })
            console.log(this)
            setTimeout(function() {
                this.props.closeModal()

            }.bind(this), 500)
        }  
    }
    componentWillUnmount() {
        console.log('addrecipe UNMOUNT')
    }


    render() {
        console.log('addrecipe render')
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
                    <input 
                        type="text" 
                        placeholder={placeholder.name} 
                        value={this.state.name} 
                        onChange={this.handleNameChange.bind(this)}
                    />
                    <input 
                        type="text" placeholder={placeholder.description}
                        value={this.state.description}
                        onChange={this.handleDescriptionChange.bind(this)}
                    />
                    <button>Save</button>
                </form>
           </div>
       )
    }
}



export default AddRecipe