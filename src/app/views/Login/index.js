import React, {useState, useEffect}  from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import history from "../../../components/History";
import Swal from "sweetalert2";

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

        const ByInputEmail = document.getElementsByName("InputEmail");
        const ByInputPass = document.getElementsByName("InputPass");
    
        const Email = ByInputEmail[0].value;
        const Pass = ByInputPass[0].value;

        /*Validación simple de campos no vacíos*/
        if(Email === null || Email === "" || Pass === null || Pass === ""){
            return Swal.fire({
                title: "Por favor, intenta de nuevo!",
                text: "Debes llenar los campos de correo y password",
                icon: "error",
                confirmButtonText: "OK",
                });
        }

        const users = localStorage.getItem("APPTEST::FOLDERSUSERS");
        let arrayUsersStorage = JSON.parse(users);
        const validateEmailExist = arrayUsersStorage.find( user => user.email === Email);
        const validatePassEquals = arrayUsersStorage.find( user => user.password === Pass);
        
        if(validateEmailExist === undefined || validatePassEquals === undefined){
            return Swal.fire({
                title: "¡Ocurrió un error!",
                text: "Correo o contraseña incorrectos",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        else{
            return history.push("/home");
        }
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
                        <input type="password" className="form-control" name="InputPass" max="" placeholder="Password" />
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row justify-content-center">
                        <button className="btn btn-primary mr-1" onClick={handleLogin}>Ingresar</button>
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