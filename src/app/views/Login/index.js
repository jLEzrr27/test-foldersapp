import React, {useState, useEffect}  from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import history from "../../../components/History";

export const Login = () => {

    const [Users, setUsers] = useState([]);

    const getUsers = () => {
        /*Cuando se carga el documento, verifica que no exista el storage de Folders para crearlo y dejarlo como un array */
        (async () => {
            await AsyncStorage.getItem("APPTEST::FOLDERSUSERS").then((value) => {
                if (value === null) {

                    /*Incializamos los usuarios en un array*/
                    const json = JSON.stringify([]);
                    AsyncStorage.setItem("APPTEST::FOLDERSUSERS", json);
                } 
                else{

                    setUsers( JSON.parse(value));
                }
            });
        })();
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleLogin = () => {

        const InputEmail = document.getElementsByName("InputEmail");
        const PasswordInput = document.getElementsByName("PasswordInput");
    }

    return (
        <>
        <div className="container mt-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Gestión de carpetas
                    </h5>
                    <hr/>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="InputEmail" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="PasswordInput" max="" placeholder="Password" />
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row justify-content-center">
                        <button className="btn btn-primary mr-1">Ingresar</button>
                        <button className="btn btn-primary ml-1" onClick={() => {history.push("/register")}}>Registrarse</button>
                        
                    </div>
                    <div className="row mt-3 justify-content-center">
                    <small>Sí no tienes una cuenta puedes registrarte con tu correo y contraseña.</small>
                    </div>
                </div>
            </div>

            <div className="footer-copyright text-center py-3">
                <small className="">John Lemuel Zarraga ℗</small>
            </div>
        </div>
        </>
    )
}