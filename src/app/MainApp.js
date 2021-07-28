import React from 'react';
import '../../node_modules/bootstrap/scss/bootstrap.scss';
import { AppRoute } from './AppRoute';
import { Router } from 'react-router-dom';
import history from '../components/History';

export const MainApp = () => {
    return (
        <Router history={history}>
            <AppRoute/>
        </Router>
    )
}
