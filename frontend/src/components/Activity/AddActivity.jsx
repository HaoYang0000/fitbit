import React, { Component } from 'react'

import axios from 'axios'
import { Button, Icon, Input, Card } from 'semantic-ui-react'
import styles from './styles.scss'
import Popup from "reactjs-popup";
import ActivityItem from "./ActivityItem.jsx";

/* This class is for add activity actions(activiti is not defined in this case) */
class AddActivity extends Component {
    constructor() {
    	super();
        this.state = {

	 	     };
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
                console.log("succesful");
                this.props.onUpdateActivity(res.data);
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







    render() {

        return(
        	<div className="add_activity" >
          <Popup trigger={<Icon name='plus circle' size='massive'/>} position="top center" closeOnDocumentClick>
                                      {close => (
                                        <div className="modal">
                                          <a className="close" onClick={close}>
                                            &times;
                                          </a>
                                          <div className="header"> Add Activity Demo </div>
                                          <div className="content">
                                          <div>
                                            <label>Activity name</label>
                                            <input type="text" name="activity_name" id='activity_name'/>
                                          </div>
                                          <div>
                                            <label>Level or Quantitiy</label>
                                            <input type="text" name="activity_level" id='activity_level'/>
                                          </div>
                                          <div>
                                            <input type="button" name="submit_activity" value="Submit" onClick={this.handleAddActivity.bind(this)}/>
                                          </div>

                                          </div>
                                          <div className="actions">

                                            <Popup
                                              trigger={<button className="button"> Trigger </button>}
                                              position="top center"
                                              closeOnDocumentClick
                                            >
                                              <span>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni omnis delectus
                                                nemo, maxime molestiae dolorem numquam mollitia, voluptate ea, accusamus excepturi
                                                deleniti ratione sapiente! Laudantium, aperiam doloribus. Odit, aut.
                                              </span>
                                            </Popup>
                                            <button
                                              className="button"
                                              onClick={() => {
                                                console.log('modal closed ')
                                                close()
                                              }}
                                            >
                                              close modal
                                            </button>
                                        </div>
                                        </div>
                                      )}
                                  </Popup>
        	</div>
    	)
	}
}

export default AddActivity
