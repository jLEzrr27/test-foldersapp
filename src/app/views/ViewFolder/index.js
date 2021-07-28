import React, { useEffect, useState } from 'react';
import * as Icon from "react-bootstrap-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import history from "../../../components/History";

export const ViewFolder = ({location}) => {

    const { pathname } = location;
    const idFolder = pathname.replace("/view-folder/", ""); //Removemos basura en el parámetro para tener solo el ID

    const [noFindFile, setNoFindFile] = useState(false);

    const getFilesFolder = (idFolder) =>{

        (async () => {
            await AsyncStorage.getItem("APPTEST::FOLDERS").then((value) => {

                /*En caso de no existir carpetas como variable storage, retornamos al home*/
                if (value === null) {                          
                    return history.push("/home");
                } 
                else{

                    const validateFolder = JSON.parse(value);

                    console.log(validateFolder);

                    /*En caso de que la carpeta exista pero el array es vacío*/
                    if(!validateFolder.length){
                        return history.push("/home")
                    }

                    const inventario = [
                        {nombre: 'manzanas', cantidad: 2},
                        {nombre: 'bananas', cantidad: 0},
                        {nombre: 'cerezas', cantidad: 5}
                    ];

                    /*Convertimos el idFolder a integer y buscamos en el array el objeto del archivo*/
                    const idFolderInt = parseInt(idFolder);
                    const validatefindFile = console.log(validateFolder.find( folder => folder.id === idFolderInt));

                    if(validatefindFile === undefined){ /*De no conseguir el archivo, usamos el state*/
                        setNoFindFile(true);
                    }
                }
            });
        })();

    }

    const handleUploadFile = () => {

    }

    useEffect(() => {
        getFilesFolder(idFolder);
    }, []);

    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">Carpeta: {null}
                    <button className="float-md-right btn btn-sm btn-primary" onClick={handleUploadFile}>
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
    )
}
