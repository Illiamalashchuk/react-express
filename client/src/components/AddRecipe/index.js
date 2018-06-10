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
    handleNameChange(event) {                        // looking at changing name input
        this.setState({ name: event.target.value });
    }
    handleDescriptionChange(event) {                // looking at changing description input
        this.setState({ description: event.target.value });
    }
    handleSubmit(event) {                       // posting new recipe / updating existing recipe
        event.preventDefault();
        if (!this.props.recipe) {
            axios.post(`http://localhost:5000/api/recipes`, {  // posting
                name: this.state.name,
                description: this.state.description
            })
            .then(res => {
                console.log(res.data);
                this.props.reload() // getting all recipes
                this.setState({ 
                    name: '',
                    description: ''
                });
            })
            setTimeout(function() { // closing modal window after posting
                this.props.closeModal()
            }.bind(this), 500)
        } else {
            axios.put(`http://localhost:5000/api/recipes/${this.props.recipe._id}`, {  // updating
                name: this.state.name,
                description: this.state.description
            })
            .then(res => {
                console.log(res.data);
                this.props.reload()   // getting all recipes
                this.setState({ 
                    name: '',
                    description: ''
                });
            })
            setTimeout(function() {
                this.props.closeModal() // closing modal window after posting
            }.bind(this), 500)
        }  
    }

    render() {
       return(
           <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                <div>{'Name'}</div>                
                    <div className="form-group">
                        <input
                            type="text"
                            required
                            placeholder={'New name'} 
                            value={this.state.name} 
                            onChange={this.handleNameChange.bind(this)}
                            className="form-control"
                        />
                    </div>
                    <div>{'Description'}</div>
                    <div className="form-group">
                        <p><textarea 
                            type="text"
                            required
                            placeholder={'New description'}
                            value={this.state.description}
                            onChange={this.handleDescriptionChange.bind(this)}
                            className="form-control description" 
                        ></textarea></p>
                    </div>
                    <button type="submit" className="btn btn-success float-right">Send</button>
                </form>
           </div>
       )
    }
}

export default AddRecipe