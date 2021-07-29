import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/*Vistas*/
import {FoldersHome} from './views/FoldersHome/index';
import {ViewFolder} from './views/ViewFolder/index';
import {Login} from './views/Login/index';

export const AppRoute = () => {
    return (
       <Switch>
           
           <Route exact path="/" render={() => (
                <Redirect to="/login"/>
            )} />

           <Route exact path="/login" component={() => <Login/> } />

           <Route exact path="/home" component={() => <FoldersHome/> } />

            { /*Con esto obtenemos el id unico de la carpeta para renderizar sus archivos en ViewFolder*/}
           <Route exact path="/view-folder/:params" component={(params) => <ViewFolder {...params} /> }/>
           <Route exact path="/view-folder" component={() => <ViewFolder/> } />
       </Switch>
    )
}
