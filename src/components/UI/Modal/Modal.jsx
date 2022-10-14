import React from 'react'
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';
import Button from '../Button/Button'

function Modal({children, show, close, continued, action}) {
  return (
    <>
      <Backdrop show={show} close={close} />
     <div onClick={(e) => e.stopPropagation()} className={`modalwindow${show ? " show" : ""}`}>
        <h5>{children}</h5>
        <div className='modal-actions'>
          <Button clicked={close} type="btn-danger">
            Отмена
          </Button>
          <Button clicked={continued} type="btn-success">
            {action}
          </Button>
        </div>
     </div>
    </>
  );
}

export default Modal
