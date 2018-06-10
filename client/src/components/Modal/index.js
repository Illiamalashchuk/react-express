import React, {Component} from 'react'
import AddRecipe from '../AddRecipe'
import './style.css'


class Modal extends Component {
    render() {
        const onButtonClick = this.props.onButtonClick
        const recipe = this.props.recipe
        const self = this.props.self
        const reload = this.props.reload
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
                            <AddRecipe recipe = {recipe} reload={reload.bind(self)} closeModal={onButtonClick}/>
                            <button type="button" className="btn btn-secondary close-button" onClick={onButtonClick}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Modal