import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

export const ModalToCreateFile = ({showModalToCreateFile, handleClose }) => {

    const [filesSelected, setFilesSelected] = useState([]);

    const handleToCreateFile = () => {

        /*Validamos que la variable del hook es un arreglo con archivos seleccionados*/
        if(filesSelected.length){

            const FileList = [...filesSelected]; //Aplicamos operador Spread 

            FileList.map((folder, key) => {

                console.log(folder);
                
            });

        }
    }

    return (
        <Modal show={showModalToCreateFile} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Subir Archivo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Control type="file"
                        
                        onChange={(e) => {

                            console.log(e.target.files);

                            if(e.target && e.target.files){
                                setFilesSelected(e.target.files);                                                    
                            }

                        }} multiple>
                        </Form.Control>              
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleToCreateFile}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
