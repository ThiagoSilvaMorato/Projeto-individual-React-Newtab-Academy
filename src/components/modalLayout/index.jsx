import React from "react";
import "./index.css";

//Modal
export function ModalPayment(props) {
  return (
    <div className='container'>
      <div className='modal__container'>
        <button className='modal__closeButton'>
          <img src='./assets/img/close-button.svg' alt='Fechar' onClick={props.closeModal} />
        </button>
        <div className='modal__header'>
          <span className='modal__firstSpan'>{props.firstSpan}</span>
          <span className='modal__secondSpan'>{props.secondSpan}</span>
        </div>
        <div className='modal__body'>{props.children}</div>
      </div>
    </div>
  );
}
