import React, {useState, useEffect} from 'react';
import * as Icon from "react-bootstrap-icons";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FoldersHome = () => {

    const [Folders, setFolders] = useState([]);

    const [showModalToCreateFolder, setshowModalToCreateFolder] = useState(false);
    const handleClose = () => setshowModalToCreateFolder(false);
    const handleShow = () => setshowModalToCreateFolder(true);

    console.log(Folders);

    useEffect(() => {

        /*Cuando se carga el documento, verifica que no exista el storage de Folders para crearlo y dejarlo como un array */
        (async () => {
            await AsyncStorage.getItem("APPTEST::FOLDERS").then((value) => {
                if (value === null) {
                    console.log("no existen carpetas");

                    const json = JSON.stringify([]);
                    AsyncStorage.setItem("APPTEST::FOLDERS", json);
                } 
                else{

                    setFolders( JSON.parse(value));
                }
            });
        })();
    }, []);

    const handleCreateFolder = () =>{

        const folders = localStorage.getItem("APPTEST::FOLDERS");
        let arrayFoldersStorage = JSON.parse(folders);
        console.log(arrayFoldersStorage);

        const ByfolderName = document.getElementsByName("folderName");
        const folderName = ByfolderName[0].value;

        var d = new Date(); //Lo usamos para simular ID único de la carpeta

        const folder = { //Objeto que representa los datos de la carpeta
            name: folderName,
            id: d.getTime(),
            files: []
        }

        arrayFoldersStorage.push(folder);
        setFolders( arrayFoldersStorage ); //Seteamos el arreglo con el nuevo objeto (carpeta)

        const json = JSON.stringify(arrayFoldersStorage); //Pasamos el arrya a string para poderlo guardar en storage
        localStorage.setItem("APPTEST::FOLDERS", json);

        handleClose(); //Cerramos el modal  
    }


    return (
        <>
            <div className="card" style={{width: "18rem;"}}>
                <div className="card-body">
                    <h5 className="card-title">Gestión de carpetas 
                        <button className="float-md-right btn btn-sm btn-primary" onClick={handleShow}>
                            <Icon.FolderFill /> +
                        </button>
                    </h5>
                    <hr/>
                    <div className="row">

                        { 
                            (Folders.length > 0) ?
                            (
                                Folders.map((folder, index) => (
                                    <div className="col-3 p-2" key={index}>
                                        <div className="d-flex justify-content-center">
                                            <h2><Icon.FolderFill /></h2>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <p>{folder.name}</p>
                                        </div>
                                    </div>
                                ))
                            )
                            :
                            (
                            <div className="col-12">
                                <div className="d-flex justify-content-center">
                                    No hay carpetas creadas.
                                </div>
                            </div>
                            )
                        }

                    </div>
                </div>
            </div>

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
        </>

    )
}
