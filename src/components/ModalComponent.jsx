import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ModalComponent = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <FontAwesomeIcon  icon={faCheckCircle} size="3x" color="green" />
        <br/>
        <br/>
        <p>Tu duda ha sido subida. Enviaremos la respuesta a tu correo.</p>
      </Modal.Body>
      <Modal.Footer>
      <form target="_blank" name='rec20108_btn1' method='post' action='https://www.webpay.cl/backpub/external/form-pay'><input type='hidden' name='idFormulario' value='197168' /><input type='hidden' name='monto' value='100' /><input type='image' title='Imagen' name='button1' src='https://www.webpay.cl/assets/img/boton_webpaycl.svg' value='Boton 1' /></form>

      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
