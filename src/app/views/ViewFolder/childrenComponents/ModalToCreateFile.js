import React, { useState } from 'react';
import { Modal, Button, Form } from "react-bootstrap";

export const ModalToCreateFile = ({
    Folder,
    Folders,
    setFolders,
    showModalToCreateFile,
    handleClose,
    getFilesFolder,
    idFolder
}) => {

    const [filesSelected, setFilesSelected] = useState([]);

    //Comentado para no mostrar warnings!
    //const [strFile64, setStrFile64] = useState("");

    /*Función para leer el archivo y convertilo en base64 */
    /*const handleReadFile = (file) => {

        const promesaBase64 = new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.readAsDataURL(file);

            reader.onload = () => { 
                resolve(reader.result);
            }
            reader.onerror = (error) => { 
                reject(error);
            }
        });

        promesaBase64.then((base64file) =>{

            const splitFile = base64file.split(",");
            const stringBase64File = splitFile[1];

            //Para setear en base64 el archivo
            setStrFile64(stringBase64File);

        }).catch(function(e){
            console.log(e);
        })
    }*/

    /*Para obtener el formato del archivo*/
    const getFormatFile = (fileName) => {
        return fileName;
    }

    /*Guarda los archivos en el files:[] del storage de carpetas*/
    const handleToCreateFile = () => {

        /*Validamos que la variable del hook es un arreglo con archivos seleccionados*/
        if(filesSelected.length){

            const FileList = [...filesSelected]; //Aplicamos operador Spread 

            FileList.map((file, key) => {

                const d = new Date();
                const objFolder = {
                    nameFile: file.name,
                    //El base64 no se puede guardar debido a que se rompe el storage => base64: strFile64,
                    format: getFormatFile(file.name),
                    id: d.getTime()
                }

                const AddFile = [ ...Folder.files, objFolder]

                Folder.files = AddFile;

                setFolders( Folders );

                //Seteamos las carpetas con sus archivos en la carpeta como string
                const json = JSON.stringify(Folders);
                localStorage.setItem("APPTEST::FOLDERS", json);

                handleClose(); //Cerramos el modal 

                getFilesFolder(idFolder); //Llamos la función que pinta los archivos en la carpeta
            });

        }
    }

    return (
        <Modal show={showModalToCreateFile} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Subir Archivo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Control type="file" accept=".xls,.xlsx,.jpg,.jpeg,.png,.docx,.doc,.pdf"
                        
                        onChange={(e) => {

                            if(e.target && e.target.files){
                                
                                const filesSelected = e.target.files;
                                const FileList = [...filesSelected];

                                setFilesSelected(FileList);

                                FileList.map((file, key) => {

                                    /*Con esta función convertimos a base64 el archivo
                                    * Pero el storage se satura al agregar muchos archivos en ese formato
                                    * Por lo que la comenté ya que en el requerimiento no pide descarga de archivos
                                    * Para lo cual es necesario tenerlos en un string base64
                                    */
                                    //handleReadFile(file);
                                });

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
