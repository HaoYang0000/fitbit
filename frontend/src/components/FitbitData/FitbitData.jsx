import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios'
import styles from './style.scss';


class FitbitData extends Component {

    constructor() {
        super();

        this.state = {
        	 date:"2018-03-10",
           range:"1d",
           detail_level:"1sec"
        };
        this.retriveData = this.retriveData.bind(this);
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

      this.retriveData();
    }

    /* Functions to retrive data from fitbit api, using axios. */
    retriveData(){
      //To get data from Fitbit api, need to oauth2 authentication. First send authentication request to get access token, and then using that token include in Bearer hearder to access data.
      // HELPFUL LINK FOR NEXT STAGE OF CHANGE: https://www.npmjs.com/package/passport-fitbit-oauth2
      axios.get('https://api.fitbit.com/1/user/-/profile.json',{
       headers: {
         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3bG9jIiwiZXhwIjoxNTI0MDE4NTY1LCJpYXQiOjE1MjM0MTM4NzJ9.UOsd4Ef9zjBc0ffDmAM4s5zko2rJllngfEgEczNgU1g' //the token is a variable which holds the token
       }}).then((res) => {
         console.log("Personal data on: "+this.state.date);
         console.log(res.data);

      }).catch( (err) => {
        console.log(err);
      });

      axios.get('https://api.fitbit.com/1/user/-/activities/heart/date/'+this.state.date+'/'+this.state.range+'/'+this.state.detail_level+'.json',{
       headers: {
         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3bG9jIiwiZXhwIjoxNTI0MDE4NTY1LCJpYXQiOjE1MjM0MTM4NzJ9.UOsd4Ef9zjBc0ffDmAM4s5zko2rJllngfEgEczNgU1g' //the token is a variable which holds the token
       }}).then((res) => {
         console.log("Heart rate on: "+this.state.date);
         console.log(res.data);

      }).catch( (err) => {
        console.log(err);
      });

      axios.get('https://api.fitbit.com/1.2/user/-/sleep/date/'+this.state.date+'.json',{
       headers: {
         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3bG9jIiwiZXhwIjoxNTI0MDE4NTY1LCJpYXQiOjE1MjM0MTM4NzJ9.UOsd4Ef9zjBc0ffDmAM4s5zko2rJllngfEgEczNgU1g' //the token is a variable which holds the token
       }}).then((res) => {
         console.log("Sleep log on: "+this.state.date);
         console.log(res.data);

      }).catch( (err) => {
        console.log(err);
      });
    }


    handleDateChange(e){
      this.setState({
          date:e.target.value
      })
    }

    handleDetailLevelChange(e){
      this.setState({
          detail_level:e.target.value
      })
    }

    handleRnageChange(e){
      this.setState({
          range:e.target.value
      })
    }

    /* Handle action: update on input data, date, range, detail_level */
    handleUpdate(e){
      this.retriveData();
    }

    render() {
            return(
                <div className="temp">
                  <h3>Testing playground</h3>
                  <div>
                    <label>Date</label>
                    <input type="text" name="date" onChange={this.handleDateChange.bind(this)}/><label>Example: The date, in the format yyyy-MM-dd or today.</label>
                  </div>
                  <div>
                    <label>Range</label>
                    <input type="text" name="detail_level" onChange={this.handleRnageChange.bind(this)}/><label>Example: The range for which data will be returned. Options are 1d, 7d, 30d, 1w, 1m.</label>
                  </div>
                  <div>
                    <label>Detail_level</label>
                      <input type="text" name="range" onChange={this.handleDetailLevelChange.bind(this)}/><label>Example: Number of data points to include. Either 1sec or 1min.</label>
                  </div>
                  <input type="button" name="update" value="Update" onClick={this.handleUpdate.bind(this)}/>
                </div>

              )
    }
}

export default FitbitData
