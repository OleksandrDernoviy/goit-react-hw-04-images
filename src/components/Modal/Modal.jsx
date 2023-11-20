import React, { Component } from "react";
import { createPortal } from "react-dom";
import css from './modal.module.css'

const modalRoot = document.querySelector('#modal-root')
class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        //   console.log(e.code);
           
    }
   
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {       
        if (e.code === 'Escape') {
     this.props.onClose();
    }  
    } 

    handleBackdropClose = e => {
        if (e.currentTarget === e.target) {
        this.props.onClose()
    }
}
    render() {
        return createPortal(
          <div className={css.modalBackdrop} onClick={this.handleBackdropClose}>
            <div className={css.modalContent}>{this.props.children}</div>
          </div>,
          modalRoot
        );
}

}

export default Modal