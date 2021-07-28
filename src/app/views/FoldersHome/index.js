import React from 'react';
import * as Icon from "react-bootstrap-icons";

export const FoldersHome = () => {
    return (
        <div className="card" style={{width: "18rem;"}}>
            <div className="card-body">
                <h5 className="card-title">Gestión de carpetas</h5>
                <hr/>
                <div className="row">
                    <div className="col-3 p-2">
                        <div className="d-flex justify-content-center">
                            <h2><Icon.FolderFill /></h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p>Carpeta 1</p>
                        </div>
                    </div>

                    <div className="col-3 p-2">
                        <div className="d-flex justify-content-center">
                            <h2><Icon.FolderFill /></h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p>Carpeta 2</p>
                        </div>
                    </div>

                    <div className="col-3 p-2">
                        <div className="d-flex justify-content-center">
                            <h2><Icon.FolderFill /></h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p>Carpeta 3</p>
                        </div>
                    </div>

                    <div className="col-3 p-2">
                        <div className="d-flex justify-content-center">
                            <h2><Icon.FolderFill /></h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            <p>Carpeta 4</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
