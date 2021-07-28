import React, {useState, useEffect} from 'react';
import * as Icon from "react-bootstrap-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalToCreateFolder } from './childrenComponents/ModalToCreateFolder';

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

    /*Con esta función insertamos una carpeta en el arreglo a través de storage*/
    const handleCreateFolder = () =>{

        const folders = localStorage.getItem("APPTEST::FOLDERS");
        let arrayFoldersStorage = JSON.parse(folders);

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
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Gestión de carpetas 
                        <button className="float-md-right btn btn-sm btn-primary" onClick={handleShow}>
                            <Icon.FolderFill /> Crear Carpeta
                        </button>
                    </h5>
                    <hr/>
                    <div className="row d-flex justify-content-center">

                        {  /*Validamos que hay carpetas registradas*/
                            (Folders.length > 0) ?
                            (
                                Folders.map((folder, index) => (
                                    <a
                                        className="btn-no-style"
                                        href={"/view-folder/"+folder.id}
                                        key={index}
                                    >
                                        <div className="col-3 p-2" onClick={null}>
                                            <div className="d-flex justify-content-center">
                                                <h2><Icon.FolderFill /></h2>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <p>{folder.name}</p>
                                            </div>
                                        </div>
                                    </a>
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

            <ModalToCreateFolder showModalToCreateFolder={showModalToCreateFolder} handleClose={handleClose} handleCreateFolder={handleCreateFolder} />
        </>

    )
}
