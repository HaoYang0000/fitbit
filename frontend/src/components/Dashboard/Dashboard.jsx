import React, { Component } from 'react'
import { Button, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GridLayout from 'react-grid-layout';
import Popup from "reactjs-popup";
import CheckActivity from '../Activity/CheckActivity.jsx'
import AddActivity from '../Activity/AddActivity.jsx'
import styles from './styles.scss'

/* This class is for main dashboard */
class Dashboard extends Component {

    constructor() {
        super();

        this.state = {
          user: {
              password: '',
              email: ''
          },
            activity: [],
            message: ''
        }
        this.handleUpdateActivity = this.handleUpdateActivity.bind(this);
    }

    componentDidMount() {

        axios.get('/api/get_activities/1').then((res) => {
          this.setState({
                activity: res.data.activities
          })
        }).catch( (err) => {
          console.log("Can not retrive data");
          this.setState({
                activity: []
          })
        });
    }


    handleUpdateActivity(new_item){
      var temp = this.state.activity;
      temp.push(new_item);
      console.log(temp);
      this.setState({
           activity: temp
      });

    }

    render() {
        if (this.state.activity.length == 0) {
            return(
                <div>
                  <div><AddActivity onUpdateActivity={this.handleUpdateActivity}/></div>
                </div>
            )
        } else {
            return(
                <div className="container">
                    <div className="plus-activity-icon">
                        <CheckActivity activities={this.state.activity}/>
                    </div>

                </div>
            )
        }
    }
}

export default Dashboard
