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

    handleAddActivity(e){

      axios.post('/api/create_new_activity', {
            name: document.getElementById('activity_name').value,
            category: 'SPORT',
            quantity: document.getElementById('activity_level').value,
            user_id: 1
          })
          .then(res => {

            if(res.status == 200){
                console.log("succesful!");
            } else {
                this.setState({
                     message: 'Unable to create!'
                 });
            }
          })
          .catch(function (error) {
            console.log("error" + error);
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
                <div><AddActivity onUpdateActivity={this.handleUpdateActivity}/></div>
            )
        } else {
            return(
                <div>
                    <div className="plus-activity-icon">
                        <CheckActivity activities={this.state.activity}/>
                    </div>
                    <AddActivity onUpdateActivity={this.handleUpdateActivity}/>
                    <div className="bottom-pannel">
                        <div className="pannel-component left" >PLACEHODER1</div>
                        <div className="pannel-component middle" >PLACEHODER2</div>
                        <div className="pannel-component right" >PLACEHODER3</div>
                    </div>
                </div>
            )
        }
    }
}

export default Dashboard
