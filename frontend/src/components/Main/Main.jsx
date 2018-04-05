import React, {Component} from 'react';
import { Link } from 'react-router';
import { Switch, Route } from 'react-router-dom'

import Home from '../Home/Home.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import AddActivity from '../Activity/AddActivity.jsx';

const Main = () =>(
    <Switch>
    	<Route exact path="/" component={Dashboard}/>
	    <Route exact path="/login" component={Login}/>
	    <Route exact path="/register" component={Register}/>
	    <Route exact path="/dashboard" component={Dashboard}/>
	    <Route exact path="/addActivity" component={AddActivity}/>
    </Switch>
)

export default Main