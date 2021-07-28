import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import history from "../../../components/History";
import { ModalToCreateFile } from './childrenComponents/ModalToCreateFile';

export const ViewFolder = ({location}) => {

    const { pathname } = location;
    const idFolder = pathname.replace("/view-folder/", ""); //Removemos basura en el parámetro para tener solo el ID

    const [noFindFile, setNoFindFile] = useState(false);

    const [Folders, setFolders] = useState([]);

    const [showModalToCreateFile, setshowModalToCreateFile] = useState(false);
    const handleClose = () => setshowModalToCreateFile(false);
    const handleShow = () => setshowModalToCreateFile(true);

    const [nameFolder, setNameFolder] = useState("");

    const getFilesFolder = (idFolder) =>{

        (async () => {
            await AsyncStorage.getItem("APPTEST::FOLDERS").then((value) => {

                /*En caso de no existir carpetas como variable storage, retornamos al home*/
                if (value === null) {                          
                    return history.push("/home");
                } 
                else{

                    /*Parseamos el valor del storage y lo seteamos acá*/
                    const validateFolder = JSON.parse(value);
                    setFolders(validateFolder);

                    /*En caso de que la carpeta exista pero el array es vacío*/
                    if(!validateFolder.length){
                        return history.push("/home")
                    }

                    /*Convertimos el idFolder a integer y buscamos en el array el objeto del archivo*/
                    const idFolderInt = parseInt(idFolder);
                    const validatefindFile = validateFolder.find( folder => folder.id === idFolderInt);

                    console.log(validatefindFile);

                    if(validatefindFile === undefined){ /*De no conseguir el archivo, usamos el state*/
                        setNoFindFile(true);
                    }
                    else{
                        setNameFolder(validatefindFile.name);
                    }
                }
            });
        })();

    }


    useEffect(() => {
        getFilesFolder(idFolder);
    }, []);

    return (
        <>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title"><b>Carpeta:</b> {nameFolder}
                    <button className="float-md-right btn btn-sm btn-primary" onClick={handleShow}>
                            <Icon.FileEarmarkArrowUp /> Subir Archivo
                        </button>
                    </h5>
                    <hr/>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12">
                            <div className="d-flex justify-content-center">
                                No hay archivos creados.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalToCreateFile showModalToCreateFile={showModalToCreateFile} handleClose={handleClose} />
        </>
    )
}
