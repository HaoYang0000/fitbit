import React, {Component} from 'react';
import { Link } from 'react-router';
import { Switch, Route } from 'react-router-dom'

import Home from '../Home/Home.jsx';
import Profile from '../Profile/Profile.jsx';
import Callback from '../Profile/Callback.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';
import AddActivity from '../Activity/AddActivity.jsx';
import FitbitData from '../FitbitData/FitbitData.jsx';
import Calories from '../FitbitData/Calories.jsx';
import Heartrate from '../FitbitData/Heartrate.jsx';
import Sleep from '../FitbitData/Sleep.jsx';
import Step from '../FitbitData/Step.jsx';
import Weight from '../FitbitData/Weight.jsx';

const Layout = () =>(
    <Switch>
    	<Route exact path="/" component={Home}/>
      <Route exact path="/home" component={Home}/>
	    <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/fitbitData" component={FitbitData}/>
	    <Route exact path="/addActivity" component={AddActivity}/>
      <Route exact path="/calories" component={Calories}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/heartrate" component={Heartrate}/>
      <Route exact path="/sleep" component={Sleep}/>
      <Route exact path="/step" component={Step}/>
      <Route exact path="/weight" component={Weight}/>
      <Route exact path="/callback" component={Callback}/>
    </Switch>
)
export default Layout
