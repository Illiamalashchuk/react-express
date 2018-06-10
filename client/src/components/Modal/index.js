import React, {Component} from 'react'
import ModalContent from './ModalContent'
import './style.css'


class Modal extends Component {
    
    render() {
        const recipe = this.props.recipe
        const self = this.props.self
        const reload = this.props.reload
        if(!this.props.isOpen) {
            return null;
          }
        return (
            <div className="modal show main-block">
                <ModalContent 
                    recipe = {recipe} 
                    reload={reload.bind(self)} // getting recipes
                    closeModal={this.props.onButtonClick.bind(this.props.context)}  // closing modal window
                    isOpen={this.props.isOpen}
                    title={this.props.title}
                /> 
            </div>
        )
    }
}


export default Modal