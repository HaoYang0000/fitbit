import React, { Component } from 'react'
import { Button, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

/* This class is for main dashboard */
class Profile extends Component {

    constructor() {
      super();
        this.state = {
            user: {},
            message: ''
        };
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get_profile_info/1').then((res) => {
          console.log(res.data);
          this.setState({
              user: {
                  name: res.data.user.name,
                  age: res.data.user.age,
                  health_level: res.data.user.health_level,
                  client_id: res.data.user.client_id
              }
          });

          if(this.state.user.health_level >=0 && this.state.user.health_level < 25){
            document.getElementById("health_level_conditon").innerHTML = "Feels Bad";
          }
          else if(this.state.user.health_level >=25 && this.state.user.health_level < 50){
            document.getElementById("health_level_conditon").innerHTML = "Feels Alright";
          }
          else if(this.state.user.health_level >=50 && this.state.user.health_level < 75){
            document.getElementById("health_level_conditon").innerHTML = "Feels Good";
          }
          else if(this.state.user.health_level >=75 && this.state.user.health_level < 100){
            document.getElementById("health_level_conditon").innerHTML = "Feels Strong";
          }
          else{
            document.getElementById("health_level_conditon").innerHTML = "Feels like an athletic!";
          }

        }).catch( (err) => {
          console.log("Can not retrive data");
        });
    }

    handleChange(event) {

      if(document.getElementById('health_level').value >=0 && document.getElementById('health_level').value< 25){
        document.getElementById("health_level_conditon").innerHTML = "Feels Bad";
      }
      else if(document.getElementById('health_level').value >=25 && document.getElementById('health_level').value< 50){
        document.getElementById("health_level_conditon").innerHTML = "Feels Alright";
      }
      else if(document.getElementById('health_level').value >=50 && document.getElementById('health_level').value< 75){
        document.getElementById("health_level_conditon").innerHTML = "Feels Good";
      }
      else if(document.getElementById('health_level').value >=75 && document.getElementById('health_level').value< 100){
        document.getElementById("health_level_conditon").innerHTML = "Feels Strong";
      }
      else{
        document.getElementById("health_level_conditon").innerHTML = "Feels like an athletic!";
      }

      this.setState({
        user: {
          name: document.getElementById('name').value,
          age: document.getElementById('age').value,
          health_level: document.getElementById('health_level').value,
          client_id: document.getElementById('client_id').value
        }
      });
    }

    handleUpdateProfile(e){

      axios.post('/api/update_profile/1', {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            health_level: document.getElementById('health_level').value,
            client_id: document.getElementById('client_id').value
          })
          .then(res => {

            if(res.status == 200){
                console.log("succesful");

            } else {
                this.setState({
                     message: 'Unable to Update!'
                 });
            }
          })
          .catch(function (error) {
            console.log("error" + error);
        });

    }

    generateLink(e){
      document.getElementById("token_link").style.display = "block";
      document.getElementById("token_link").href = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id="+document.getElementById('client_id').value+"&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800";
    }

    render() {
      var hidden = {display: 'none'};
        return(
            <div className="container">
              <div className="inner-container-profile">
                <div>
                  <Icon name="user circle" size="massive" color="blue"></Icon>
                  <br/>
                </div>
                <div>
                  <label>Name: </label> <br/>
                  <input type="text" name="name" id="name" value={this.state.user.name} onChange={this.handleChange}/>
                  <br/>
                </div>
                <div>
                  <label>Age: </label> <br/>
                  <input type="text" name="age" id="age" value={this.state.user.age} onChange={this.handleChange}/>
                  <br/>
                </div>

                <div>
                  <label>Health Level: </label> <br/>
                  <label id="health_level_conditon" ></label> <br/>
                  <input type="range" name="health_level" id="health_level" step="25" value={this.state.user.health_level} onChange={this.handleChange}/>
                  <br/>
                </div>

                <div>
                  <input type="button" value="Update" onClick={this.handleUpdateProfile.bind(this)}/>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div>
                  <label>Fitbit Auth Client ID: </label> <br/>
                  <input type="text" name="client_id" id="client_id" value={this.state.user.client_id} onChange={this.handleChange}/>
                  <br/>
                  <a id="token_link" href="#" style={hidden}>Grant Access</a>
                </div>
                <div>
                  <input type="button" value="Refresh Token" onClick={this.generateLink.bind(this)}/>
                </div>

              </div>
            </div>
        )
    }
}

export default Profile
