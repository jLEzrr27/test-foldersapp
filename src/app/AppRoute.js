import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { WithRouter } from 'react-router';

/*Vistas*/
import {FoldersHome} from './views/FoldersHome/index';

export const AppRoute = () => {
    return (
       <Switch>
           <Route exact path="/home" component={() => <FoldersHome/> } />
       </Switch>
    )
}
