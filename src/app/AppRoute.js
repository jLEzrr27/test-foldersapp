import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { WithRouter } from 'react-router';

/*Vistas*/
import {FoldersHome} from './views/FoldersHome/index';
import {ViewFolder} from './views/ViewFolder/index';

export const AppRoute = () => {
    return (
       <Switch>
           <Route exact path="/home" component={() => <FoldersHome/> } />

            { /*Con esto obtenemos el id unico de la carpeta para renderizar sus archivos en ViewFolder*/}
           <Route exact path="/view-folder/:params" component={(params) => <ViewFolder {...params} /> }/>
           <Route exact path="/view-folder" component={() => <ViewFolder/> } />
       </Switch>
    )
}
