import React from 'react'

export const Login = () => {
    return (
        <>
        <div className="container mt-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Gestión de carpetas
                    </h5>
                    <hr/>
                    <div className="form-group">
                        <label htmlFor="InputEmail">Email</label>
                        <input type="email" className="form-control" id="InputEmail" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="PasswordInput">Password</label>
                        <input type="password" className="form-control" id="PasswordInput" max="" placeholder="Password" />
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row justify-content-center">
                        <button className="btn btn-primary mr-1">Ingresar</button>
                        <button className="btn btn-primary ml-1">Registrarse</button>
                        
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