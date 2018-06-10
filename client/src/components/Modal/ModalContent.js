import React, {Component} from 'react'
import AddRecipe from '../AddRecipe'
import onClickOutside from "react-onclickoutside";
import './style.css'


class Modal extends Component {
    handleClickOutside() { // closing Modal from outside click
        this.props.closeModal()
      }
    render() {
        const onButtonClick = this.props.closeModal
        const recipe = this.props.recipe
        const reload = this.props.reload // getting recipes(App)
        const self = this.props.self     // context(App)
        if(!this.props.isOpen) {
            return null;
          }
        return (
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
        )
    }
}


export default onClickOutside(Modal)