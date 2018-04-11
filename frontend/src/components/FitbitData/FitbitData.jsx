import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios'
import styles from './style.scss';


class FitbitData extends Component {

    constructor() {
        super();
    }

    componentDidMount(){
      // let FITBIT_URL = 'www.fitbit.com';
      // let FITBIT_API_URL = 'api.fitbit.com';
      // let CLIENT_ID = '22CNW2';
      // let CLIENT_SECRET = '88bd3aa98eebcf6eb6a01a510973768f';
      // let RIDIRECT_URL = 'http://localhost:3000/callback';
      // let EXPIRE_TIME = 604800;
      //
      // let url = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id='+CLIENT_ID+'&redirect_uri='+RIDIRECT_URL+'%2Fcallback&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in='+EXPIRE_TIME
      //
      // axios.get(url,{
      //  headers: {
      //    Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3bG9jIiwiZXhwIjoxNTI0MDE4NTY1LCJpYXQiOjE1MjM0MTM4NzJ9.UOsd4Ef9zjBc0ffDmAM4s5zko2rJllngfEgEczNgU1g' //the token is a variable which holds the token
      //  }}).then((res) => {
      //  console.log(res);
      //
      // }).catch( (err) => {
      //   console.log(err);
      // });


      axios.get('https://api.fitbit.com/1/user/-/profile.json',{
       headers: {
         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3bG9jIiwiZXhwIjoxNTI0MDE4NTY1LCJpYXQiOjE1MjM0MTM4NzJ9.UOsd4Ef9zjBc0ffDmAM4s5zko2rJllngfEgEczNgU1g' //the token is a variable which holds the token
       }}).then((res) => {
       console.log(res.data);

      }).catch( (err) => {
        console.log(err);
      });
    }

    render() {
            return(
                <div>

                </div>

              )
    }
}

export default FitbitData
