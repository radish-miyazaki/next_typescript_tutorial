import React, {ReactNode, useEffect, useState} from 'react';
import styles from '@/styles/Modal.module.css'
import {FaTimes} from "react-icons/fa";
import ReactDOM from 'react-dom';

type ModalProps = {
  show: boolean;
  onClose: Function;
  children: ReactNode;
  title: string;
}

const Modal = (props: ModalProps) => {
  const {show, onClose, children, title} = props
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => setIsBrowser(true))

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        { title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
  } else {
    return null
  }
};

export default Modal;

// https://devrecipes.net/modal-component-with-next-js/
