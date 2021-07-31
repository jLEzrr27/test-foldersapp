import React, {useState} from 'react';
import Swal from "sweetalert2";
import history from "../../../components/History";

export const RegisterUser = () => {

    const [Users, setUsers] = useState([]);

    const [User, setUser] = useState({});

    const register = () =>{
    
        const users = localStorage.getItem("APPTEST::FOLDERSUSERS");
        let arrayUsersStorage = JSON.parse(users);
    
        const ByInputEmail = document.getElementsByName("InputEmail");
        const Email = ByInputEmail[0].value;

        const ByInputPass = document.getElementsByName("InputPass");
        const Pass = ByInputPass[0].value;

        /*Nos asesguramos que el correo no ha sido registrado*/
        const UserValidateWithEmail = arrayUsersStorage.find( user => user.email === Email);

        console.log(UserValidateWithEmail);

        if(UserValidateWithEmail !== undefined){
            setUser(UserValidateWithEmail);
        }
        else{
            return Swal.fire({
                title: "Por favor, intenta de nuevo!",
                text: `El correo ingresado ${Email} ya ha sido registrado!`,
                icon: "error",
                confirmButtonText: "OK",
              });         
        }

        return 1;

        /*Validación simple de campos no vacíos*/
        if(Email === null || Email === null || Pass === "" || Pass === ""){
            return Swal.fire({
                title: "Por favor, intenta de nuevo!",
                text: "Debes llenar los campos de correo y password",
                icon: "error",
                confirmButtonText: "OK",
              });
        }
    
        const d = new Date(); //Lo usamos para simular ID único de la carpeta
        const user = { //Objeto que representa los datos de la carpeta
            email: Email,
            password: Pass,
            id: d.getTime()
        }
    
        arrayUsersStorage.push(user);
        setUsers( arrayUsersStorage ); //Seteamos el arreglo con el nuevo objeto (carpeta)
    
        const json = JSON.stringify(arrayUsersStorage); //Pasamos el arrya a string para poderlo guardar en storage
        localStorage.setItem("APPTEST::FOLDERSUSERS", json);
    
        return Swal.fire({
            title: "Registro de cuenta",
            text: "Has registrado tu cuenta con éxito!",
            icon: "info",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
    
            }
        });
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
                        <button className="btn btn-primary ml-1" onClick={register}>Registrar cuenta</button>
                        
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
