import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios'
import styles from './style.scss';
import RC2 from 'react-chartjs2';
import { ButtonGroup,Button } from 'react-bootstrap';

const data = {

  labels: [],
  datasets: [
    //HR
    {
      type: 'line',
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,0.4)',
      // fill: false,
      // lineTension: 0.1,
      // backgroundColor: 'rgba(75,192,192,0.4)',
      // borderColor: 'rgba(75,192,192,1)',
      // borderCapStyle: 'butt',
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: 'miter',
      // pointBorderColor: 'rgba(75,192,192,1)',
      // pointBackgroundColor: '#fff',
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      // pointHoverBorderColor: 'rgba(220,220,220,1)',
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      label: 'Heart Rate Data',
      fill: false,
      showLine: true,
      legend: {
            display: true,
            text: String
      },
      data: []

    },
    //SLeep
    {
      label: 'Sleep Data',
      backgroundColor: 'rgba(115,102,192,0.4)',
      borderColor: 'rgba(115,102,192,0.4)',
      type: 'line',
      fill: false,
      showLine: true,
      legend: {
            display: true,
            text: String
      },
      data: []
    },
    //Calories
    {
      label: 'Calories Data',
      backgroundColor: 'rgba(75,102,100,0.4)',
      borderColor:  'rgba(75,102,100,0.4)',
      type: 'line',
      fill: false,
      showLine: true,
      legend: {
            display: true,
            text: String
      },
      data: []
    },//Step
    {
      label: 'Step Data',
      backgroundColor: 'rgba(5,102,192,0.4)',
      borderColor: 'rgba(5,102,192,0.4)',
      type: 'line',
      fill: false,
      showLine: true,
      legend: {
            display: true,
            text: String
      },
      data: []
    },
  ]
};

class FitbitData extends Component {

    constructor() {
        super();

        this.state = {
           select_type:'day',
        	 date:"2018-04-14",
           range:"1m",
           detail_level:"1min",
           chart_labels:[],
           hr_data:[],
           sl_data:[],
           cl_data:[],
           sp_data:[]
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
         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTI0NjI0MDg0LCJpYXQiOjE1MjQwMTkyODR9.SstXL4QimBfDHfaY8uVhshcIBT6YFmV9y12PA40ac0s' //the token is a variable which holds the token
       }}).then((res) => {
         console.log("Personal data on: "+this.state.date);
         console.log(res.data);

      }).catch( (err) => {
        console.log(err);
      });

      // FOR Heart rate
      axios.get('https://api.fitbit.com/1/user/-/activities/heart/date/'+this.state.date+'/'+this.state.range+'/'+this.state.detail_level+'.json',{
       headers: {
         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTI0NjI0MDg0LCJpYXQiOjE1MjQwMTkyODR9.SstXL4QimBfDHfaY8uVhshcIBT6YFmV9y12PA40ac0s' //the token is a variable which holds the token
       }}).then((res) => {
         console.log("Heart rate on: "+this.state.date);
         console.log( res.data['activities-heart']  );

         var temp_data  = [];
         var temp_label  = [];
         var min = 9999999999999;
         var max = -1;

         for (var i = 0; i < res.data['activities-heart'].length; i++) {
           temp_data.push(res.data['activities-heart'][i]['value']['restingHeartRate']);
           temp_label.push(res.data['activities-heart'][i]['dateTime']);
           if(parseInt(res.data['activities-heart'][i]['value']['restingHeartRate'])>= max){
             max = parseInt(res.data['activities-heart'][i]['value']['restingHeartRate']);
           }
           if(parseInt(res.data['activities-heart'][i]['value']['restingHeartRate']) <= min){
             min = parseInt(res.data['activities-heart'][i]['value']['restingHeartRate']);
           }
         }

         for (var i = 0; i < temp_data.length; i++) {
           //Normalize
           temp_data[i] = 1 + ( temp_data[i] - min ) * (5 - 1 )/ (max - min);
         }

         this.setState({
             hr_data:temp_data,
             chart_labels:temp_label
         })

         this.myChart = this.refs['canvas'].getChart();
         this.myChart.data.datasets[0].data = this.state.hr_data;
         this.myChart.data.labels = this.state.chart_labels;
         this.myChart.update();

      }).catch( (err) => {
        console.log(err);
      });

      // FOR SLEEP
      axios.get('https://api.fitbit.com/1/user/-/sleep/minutesAsleep/date/'+this.state.date+'/'+this.state.range+'.json',{
       headers: {
         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTI0NjI0MDg0LCJpYXQiOjE1MjQwMTkyODR9.SstXL4QimBfDHfaY8uVhshcIBT6YFmV9y12PA40ac0s' //the token is a variable which holds the token
       }}).then((res) => {
         console.log("Sleep log on: "+this.state.date);
         console.log(res.data);

         var temp_data  = [];
         var average = 0;
         var min = 9999999999999;
         var max = -1;

         for (var i = 0; i < res.data['sleep-minutesAsleep'].length; i++) {
           temp_data.push(parseInt(res.data['sleep-minutesAsleep'][i]['value']));
           if(parseInt(res.data['sleep-minutesAsleep'][i]['value'])>= max){
             max = parseInt(res.data['sleep-minutesAsleep'][i]['value']);
           }
           if(parseInt(res.data['sleep-minutesAsleep'][i]['value']) <= min){
             min = parseInt(res.data['sleep-minutesAsleep'][i]['value']);
           }
         }

         for (var i = 0; i < temp_data.length; i++) {
           //Normalize
           temp_data[i] = 1 + ( temp_data[i] - min ) * (5 - 1 )/ (max - min);
         }

         this.setState({
             sl_data:temp_data
         })

         this.myChart = this.refs['canvas'].getChart();
         this.myChart.data.datasets[1].data = this.state.sl_data;
         this.myChart.update();

      }).catch( (err) => {
        console.log(err);
      });

      // FOR Calories
      axios.get('https://api.fitbit.com/1/user/-/activities/calories/date/'+this.state.date+'/'+this.state.range+'.json',{
       headers: {
         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTI0NjI0MDg0LCJpYXQiOjE1MjQwMTkyODR9.SstXL4QimBfDHfaY8uVhshcIBT6YFmV9y12PA40ac0s' //the token is a variable which holds the token
       }}).then((res) => {
         console.log("Calories log on: "+this.state.date);
         console.log(res.data);

         var temp_data  = [];
         var average = 0;
         var min = 9999999999999;
         var max = -1;

         for (var i = 0; i < res.data['activities-calories'].length; i++) {
           temp_data.push(parseInt(res.data['activities-calories'][i]['value']));
           if(parseInt(res.data['activities-calories'][i]['value'])>= max){
             max = parseInt(res.data['activities-calories'][i]['value']);
           }
           if(parseInt(res.data['activities-calories'][i]['value']) <= min){
             min = parseInt(res.data['activities-calories'][i]['value']);
           }
         }

         for (var i = 0; i < temp_data.length; i++) {
           //Normalize
           temp_data[i] = 1 + ( temp_data[i] - min ) * (5 - 1 )/ (max - min);
         }

         this.setState({
             cl_data:temp_data
         })

         this.myChart = this.refs['canvas'].getChart();
         this.myChart.data.datasets[2].data = this.state.cl_data;
         this.myChart.update();

      }).catch( (err) => {
        console.log(err);
      });

      // FOR Steps
      axios.get('https://api.fitbit.com/1/user/-/activities/steps/date/'+this.state.date+'/'+this.state.range+'.json',{
       headers: {
         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTI0NjI0MDg0LCJpYXQiOjE1MjQwMTkyODR9.SstXL4QimBfDHfaY8uVhshcIBT6YFmV9y12PA40ac0s' //the token is a variable which holds the token
       }}).then((res) => {
         console.log("Steps log on: "+this.state.date);
         console.log(res.data);

         var temp_data  = [];
         var average = 0;
         var min = 9999999999999;
         var max = -1;

         for (var i = 0; i < res.data['activities-steps'].length; i++) {
           temp_data.push(parseInt(res.data['activities-steps'][i]['value']));
           if(parseInt(res.data['activities-steps'][i]['value'])>= max){
             max = parseInt(res.data['activities-steps'][i]['value']);
           }
           if(parseInt(res.data['activities-steps'][i]['value']) <= min){
             min = parseInt(res.data['activities-steps'][i]['value']);
           }
         }

         for (var i = 0; i < temp_data.length; i++) {
           //Normalize
           temp_data[i] = 1 + ( temp_data[i] - min ) * (5 - 1 )/ (max - min);
         }

         this.setState({
             sp_data:temp_data
         })

         this.myChart = this.refs['canvas'].getChart();
         this.myChart.data.datasets[3].data = this.state.sp_data;
         this.myChart.update();

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

    onSelectChanged(e){
      this.setState({
          select_type:e.target.value
      })
    }

    /* Handle action: update on input data, date, range, detail_level */
    handleUpdate(e){
      this.retriveData();
    }

    render() {
            return(

                <div className="temp">
                  <div>
                    <input type="radio" id="select_day"
                     name="select" value="day" checked={this.state.select_type === 'day'} onChange={this.onSelectChanged.bind(this)} />
                    <label htmlFor="select_day">Daily</label>

                    <input type="radio" id="select_week"
                     name="select" value="week" checked={this.state.select_type === 'week'} onChange={this.onSelectChanged.bind(this)} />
                    <label htmlFor="select_week">Weekly</label>

                    <input type="radio" id="select_month"
                     name="select" value="month" checked={this.state.select_type === 'month'} onChange={this.onSelectChanged.bind(this)} />
                    <label htmlFor="select_month">Monthly</label>

                    <input type="radio" id="select_year"
                     name="select" value="year" checked={this.state.select_type === 'year'} onChange={this.onSelectChanged.bind(this)} />
                    <label htmlFor="select_year">Yearly</label>
                  </div>

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
                  <RC2 data={data} type='line' ref='canvas'/>
                </div>

              )
    }
}

export default FitbitData
