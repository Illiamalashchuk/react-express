import React, {Component} from 'react'
import AddRecipe from '../AddRecipe'
import './style.css'


class Modal extends Component {
    render() {
        const onButtonClick = this.props.onButtonClick
        const recipe = this.props.recipe
        if(!this.props.isOpen) {
            return null;
          }
        return (
            <div className="modal show test" style={{display: 'block'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button type="button" className="close" onClick={onButtonClick}>
                            <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <AddRecipe recipe = {recipe} reload={this.props.reload} closeModal={onButtonClick}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onButtonClick}>Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Modal