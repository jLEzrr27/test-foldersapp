import React from 'react'
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

export const ModalToCreateFolder = ({showModalToCreateFolder, handleClose, handleCreateFolder}) => {
    return (
        <Modal show={showModalToCreateFolder} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Crea tu carpeta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <InputGroup className="mb-2">
                <Form.Control
                    name="folderName"
                    type="text"
                    placeholder="Escribe el nombre de la carpeta"
                />
            </InputGroup>                   
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cerrar
        </Button>
        <Button variant="primary" onClick={handleCreateFolder}>
            Guardar
        </Button>
        </Modal.Footer>
    </Modal>
    )
}
