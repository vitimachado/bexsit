import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import HomeCards from './containers/home';
import ContainerTabCards from './containers/tab-cards/index';
import Navbar from './containers/navbar';
import {Loading} from './components/loading/loading';
import Login from './containers/login';

const Routes = () => {
    
    const page = useSelector(state =>  state.search.page/* //console.log('pppppppp page', state) */ );
    //const loading = useSelector(state => state.search.page, []);
    const RedirectPage = ({page}) => page ? <Redirect to={page}/> : null;

    return (
        <>
        <BrowserRouter>
            <RedirectPage page={page}/>
            <Navbar />
            <Switch>
                <Route exact path="/" component={() => <HomeCards />} />
                <Route exact path="/login" component={() => <Login />} />
                <Route path="/tab" component={() => <ContainerTabCards />} />
            </Switch>
        </BrowserRouter>
        <Loading/>
        </>
    )
};

export default Routes;