import React from 'react'
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

export const ModalToEditFolder = ({
    showModalToEditFolder,
    handleCloseEdit,
    handleEditFolder,
    nameFolder,
    indexFolder}) => {
    return (
        <Modal show={showModalToEditFolder} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
            <Modal.Title>Crea tu carpeta</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-2">
                        <Form.Control
                            name="folderName"
                            type="text"
                            placeholder="Escribe el nombre de la carpeta"
                            defaultValue={nameFolder}
                        />
                    </InputGroup>                   
                </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
                Cerrar
            </Button>
            <Button variant="primary" onClick={() => handleEditFolder(indexFolder) }>
                Guardar
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
