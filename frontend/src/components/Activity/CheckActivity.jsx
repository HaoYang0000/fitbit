import React, { Component } from 'react'

import axios from 'axios'
import { Button, Input, Card } from 'semantic-ui-react'
import styles from './styles.scss'

import ActivityItem from "./ActivityItem.jsx";
import Header from '../Header/Header.jsx';

/* This class is for check activity(activiti is already defined in this case)  */
class CheckActivity extends Component {
    constructor(props) {
    	super(props);
      console.log(this.props.activities);
      this.state = {
          activity: this.props.activities,
          message: ''
      }
    }




    render() {
      let items = this.state.activity.map(item =>{
        return <ActivityItem key={item._id} item={item}  />
      })

        return(
          <div>
          	<div className="center" >
              {items}
          	</div>
          </div>
    	)
	}
}

export default CheckActivity
