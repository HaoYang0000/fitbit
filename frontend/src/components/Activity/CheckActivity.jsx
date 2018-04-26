import React, { Component } from 'react'

import axios from 'axios'
import { Button, Input, Card } from 'semantic-ui-react'
import styles from './styles.scss'

import ActivityItem from "./ActivityItem.jsx";


/* This class is for check activity(activiti is already defined in this case)  */
class CheckActivity extends Component {
    constructor(props) {
    	super(props);
      console.log(this.props.activities);
      this.state = {
          activity: this.props.activities.slice(1, 10),
          message: ''
      }
    }




    render() {
      let items = this.state.activity.map(item =>{
        return <ActivityItem key={item._id} name={item.name} id={item._id} quantity={item.quantity}/>
      })

        return(
        	<div className="center" >
            {items}
        	</div>
    	)
	}
}

export default CheckActivity
