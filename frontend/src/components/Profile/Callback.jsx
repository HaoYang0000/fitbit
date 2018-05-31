import React, { Component } from 'react'
import { Button, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

/* This class is for main dashboard */
class Callback extends Component {

    constructor(props) {
      super(props);
      this.state = {
          token: this.props.location.hash.split("&")[0].split("=")[1],
          message:''
      };

    }

    componentDidMount() {
      axios.post('/api/update_user_token/1', {
          token: this.state.token
        })
        .then(res => {

          if(res.status == 200){
            this.setState({
              message:"succesful!"
            });

          } else {
            this.setState({
              message:"Can not retrive data"
            });
          }
        })
        .catch(function (error) {
          this.setState({
            message:"Can not retrive data"
          });
      });
    }




    render() {
        return(
            <div className="container">
              <br/>
              <br/>
              <br/>
              <br/>
              {this.state.message}
            </div>
        )
    }
}

export default Callback
