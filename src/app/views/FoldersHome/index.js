import React, {useState, useEffect} from 'react';
import * as Icon from "react-bootstrap-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalToCreateFolder } from './childrenComponents/ModalToCreateFolder';
import { ModalToEditFolder } from './childrenComponents/ModalToEditFolder';
import Swal from "sweetalert2";

export const FoldersHome = () => {

    const [Folders, setFolders] = useState([]);

    /* Hook y functions de modal de crear carpeta */
    const [showModalToCreateFolder, setshowModalToCreateFolder] = useState(false);
    const handleClose = () => setshowModalToCreateFolder(false);
    const handleShow = () => setshowModalToCreateFolder(true);

    /* Hook y functions de modal de editar carpeta */
    const [showModalToEditFolder, setshowModalToEditFolder] = useState(false);
    const handleCloseEdit = () => setshowModalToEditFolder(false);
    const handleShowEdit = () => setshowModalToEditFolder(true);

    const [nameFolder, setNameFolder] = useState("");
    const [indexFolder, setIndexFolder] = useState(null);

    /*Función para renderizar carpetas en la vista*/
    const getFolders = () => {
        /*Cuando se carga el documento, verifica que no exista el storage de Folders para crearlo y dejarlo como un array */
        (async () => {
            await AsyncStorage.getItem("APPTEST::FOLDERS").then((value) => {
                if (value === null) {

                    const json = JSON.stringify([]);
                    AsyncStorage.setItem("APPTEST::FOLDERS", json);
                } 
                else{

                    setFolders( JSON.parse(value));
                }
            });
        })();
    }

    useEffect(() => {
        getFolders();
    }, []);

    /*Función para confirmar eliminación de carpeta*/
    const DeleteFolder = (key) => {

        Swal.fire({
            title: "¿Deseas eliminar la carpeta?",
            icon: "info",
            confirmButtonText: "Si",
            showCancelButton: true,
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {

                Folders.splice(key, 1);

                setFolders(Folders);

                const json = JSON.stringify(Folders);
                localStorage.setItem("APPTEST::FOLDERS", json);

                getFolders();
                
            }
        });
    }

    /*Con esta función insertamos una carpeta en el arreglo a través de storage*/
    const handleCreateFolder = () =>{

        const folders = localStorage.getItem("APPTEST::FOLDERS");
        let arrayFoldersStorage = JSON.parse(folders);

        const ByfolderName = document.getElementsByName("folderName");
        const folderName = ByfolderName[0].value;

        const d = new Date(); //Lo usamos para simular ID único de la carpeta

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

    /*Levanta el modal para editar el nombre de la carpeta*/
    const EditFolder = (key) => {
        const { name } = (Folders[key]);
        handleShowEdit();
        setIndexFolder(key);
        setNameFolder(name);
    }

    /*Guardar edición del nombre al dar click en guardar en el modal*/
    const handleEditFolder = (key) =>{

        Swal.fire({
            title: "¿Deseas editar la carpeta?",
            icon: "info",
            confirmButtonText: "Si",
            showCancelButton: true,
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {

                const editFolderName = document.getElementsByName("folderName");
                const folderName = editFolderName[0].value;
        
                Folders[key].name = folderName;
                
                setFolders(Folders);
        
                const json = JSON.stringify(Folders);
                localStorage.setItem("APPTEST::FOLDERS", json);
                
                handleCloseEdit();
        
                getFolders();     
            }
        });
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
                                Folders.map((folder, key) => (
                                    <div key={key} className="border border-link m-2 col-3 ">
                                        <div className="pt-3 pb-3">
                                            <a className="btn-no-style" href={"/view-folder/"+folder.id}>
                                                <div className="d-flex justify-content-center">
                                                    <h2><Icon.FolderFill /></h2>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <p>{folder.name}</p>
                                                </div>
                                            </a>
                                            <div className="d-flex p-2 row float-right">
                                                <button className="btn btn-danger btn-sm mr-2" onClick={() => { DeleteFolder(key) }}>
                                                    <Icon.Trash />
                                                </button>
                                                <button className="btn btn-secondary btn-sm" onClick={() => { EditFolder(key) }}>
                                                    <Icon.Pencil />
                                                </button>
                                            </div>
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

            <ModalToCreateFolder showModalToCreateFolder={showModalToCreateFolder} handleClose={handleClose} handleCreateFolder={handleCreateFolder} />

            <ModalToEditFolder showModalToEditFolder={showModalToEditFolder} handleCloseEdit={handleCloseEdit} 
            handleEditFolder={handleEditFolder} nameFolder={nameFolder} indexFolder={indexFolder}/>
        </>

    )
}
