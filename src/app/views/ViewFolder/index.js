import React, { useEffect } from 'react';
import * as Icon from "react-bootstrap-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import history from "../../../components/History";

export const ViewFolder = ({location}) => {

    const { pathname } = location;
    const idFolder = pathname.replace("/", "");

    const getFilesFolder = (idFolder) =>{

        (async () => {
            await AsyncStorage.getItem("APPTEST::FOLDERS").then((value) => {

                /*En caso de no existir carpetas como variable storage, retornamos al home*/
                if (value === null) {                          
                    return history.push("/home");
                } 
                else{

                    const foldersIsEmpty = JSON.parse(value);

                    /*En caso de que la carpeta exista pero el array es vacío*/
                    if(!foldersIsEmpty.length){
                        return history.push("/home")
                    }
                }
            });
        })();

    }

    useEffect(() => {
        getFilesFolder(idFolder);
    }, []);

    return (
        <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">Carpeta: {null}
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
