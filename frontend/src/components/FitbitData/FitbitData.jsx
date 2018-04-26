import React, { Component } from 'react';
import { Button, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios'
import styles from './style.scss';
import RC2 from 'react-chartjs2';
import Popup from "reactjs-popup";
import Corelation from "./Corelation.jsx";

const data = {

  labels: [],
  datasets: [
    //HR
    // {
    //   type: 'line',
    //   backgroundColor: 'rgba(75,192,192,0.4)',
    //   borderColor: 'rgba(75,192,192,0.4)',
    //   // fill: false,
    //   // lineTension: 0.1,
    //   // backgroundColor: 'rgba(75,192,192,0.4)',
    //   // borderColor: 'rgba(75,192,192,1)',
    //   // borderCapStyle: 'butt',
    //   // borderDash: [],
    //   // borderDashOffset: 0.0,
    //   // borderJoinStyle: 'miter',
    //   // pointBorderColor: 'rgba(75,192,192,1)',
    //   // pointBackgroundColor: '#fff',
    //   // pointBorderWidth: 1,
    //   // pointHoverRadius: 5,
    //   // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //   // pointHoverBorderColor: 'rgba(220,220,220,1)',
    //   // pointHoverBorderWidth: 2,
    //   // pointRadius: 1,
    //   // pointHitRadius: 10,
    //   label: 'Heart Rate Data',
    //   fill: false,
    //   showLine: true,
    //   legend: {
    //         display: true,
    //         text: String
    //   },
    //   data: []
    //
    // },
    //SLeep
    // {
    //   label: 'Sleep Data',
    //   backgroundColor: 'rgba(115,102,192,0.4)',
    //   borderColor: 'rgba(115,102,192,0.4)',
    //   type: 'line',
    //   fill: false,
    //   showLine: true,
    //   legend: {
    //         display: true,
    //         text: String
    //   },
    //   data: []
    // },
    // //Calories
    // {
    //   label: 'Calories Data',
    //   backgroundColor: 'rgba(75,102,100,0.4)',
    //   borderColor:  'rgba(75,102,100,0.4)',
    //   type: 'line',
    //   fill: false,
    //   showLine: true,
    //   legend: {
    //         display: true,
    //         text: String
    //   },
    //   data: []
    // },//Step
    // {
    //   label: 'Step Data',
    //   backgroundColor: 'rgba(5,102,192,0.4)',
    //   borderColor: 'rgba(5,102,192,0.4)',
    //   type: 'line',
    //   fill: false,
    //   showLine: true,
    //   legend: {
    //         display: true,
    //         text: String
    //   },
    //   data: []
    // },
  ]
};

const auth = 'Bearer '+'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTI1MzA2NjAzLCJpYXQiOjE1MjQ3MDE4MDN9.tMmLyFZnkb4FlzFFH35XvfhIRT90TcDIQKA5R01sN2Y';

class FitbitData extends Component {

    constructor() {
        super();

        this.state = {
           select_type:'week',
        	 date:"2018-04-24",
           period:"7d",
           detail_level:"1min",
           chart_labels:[],
           hr_data:[],
           sl_data:[],
           cl_data:[],
           sp_data:[],
           activity:[]
        };
        this.retriveData = this.retriveData.bind(this);
        this.clearGraph = this.clearGraph.bind(this);
        this.retriveActivities = this.retriveActivities.bind(this);
        this.getDataFromDate = this.getDataFromDate.bind(this);
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


      this.clearGraph();

      this.retriveData();

      this.retriveActivities();






    }

    retriveActivities(){
      axios.get('/api/get_activities/1').then((res) => {
        this.setState({
              activity: res.data.activities
        });
        this.getDataFromDate(this.state.activity);


      }).catch( (err) => {
        console.log("Can not retrive data");
        this.setState({
              activity: []
        })
      });

      // this.myChart = this.refs['canvas'].getChart();
      // var temp = [];
      // for (var i = 0; i < this.myChart.data.labels.length; i++) {
      //   temp.push(Math.random()*document.getElementById('activity_level').value);
      // }
      // var color = 'rgba('+(Math.random()*255)+','+(Math.random()*255)+','+(Math.random()*255)+',0.4)';
      // this.myChart.data.datasets.push({
      //   label: document.getElementById('activity_name').value,
      //   backgroundColor: color,
      //   borderColor: color,
      //   type: 'line',
      //   fill: false,
      //   showLine: true,
      //   legend: {
      //         display: true,
      //         text: String
      //   },
      //   data: this.state.activity
      // });
      // this.myChart.update();
    }

    getDataFromDate(data){

      this.myChart = this.refs['canvas'].getChart();

      //Yoga
      var temp = [];
      var color = 'rgba('+(Math.random()*255)+','+(Math.random()*255)+','+(Math.random()*255)+',0.4)';
      var min = 9999999999999;
      var max = -1;
      console.log(data);
      console.log(max);
      console.log(min);

      var startDate = this.myChart.data.labels[0];
      var endDate = this.myChart.data.labels[this.myChart.data.labels.length-1];

      for (var i = 0; i < 100; i++) {
        if(data[i].time >= startDate && data[i].time <= endDate){
          if(data[i].quantity >= max){
            max = data[i].quantity;
          }
          if(data[i].quantity <= min){
            min = data[i].quantity;
          }
          temp.push(data[i].quantity);
        }
      }


      for (var i = 0; i < temp.length; i++) {
        //Normalize
        temp[i] = 1 + ( temp[i] - min ) * (5 - 1)/ (max - min);
      }

      this.myChart.data.datasets.push({
        label: data[0].name,
        backgroundColor: color,
        borderColor: color,
        type: 'line',
        fill: false,
        showLine: true,
        legend: {
              display: true,
              text: String
        },
        data: temp
      });
      this.myChart.update();


      //Jog
      temp = [];
      color = 'rgba('+(Math.random()*255)+','+(Math.random()*255)+','+(Math.random()*255)+',0.4)';
      min = 9999999999999;
      max = -1;

      for (var i = 100; i < 200; i++) {
        if(data[i].time >= startDate && data[i].time <= endDate){
          if(data[i].quantity >= max){
            max = data[i].quantity;
          }
          if(data[i].quantity <= min){
            min = data[i].quantity;
          }
          temp.push(data[i].quantity);
        }
      }


      for (var i = 0; i < temp.length; i++) {
        //Normalize
        temp[i] = 1 + ( temp[i] - min ) * (5 - 1)/ (max - min);
      }

      this.myChart.data.datasets.push({
        label: data[100].name,
        backgroundColor: color,
        borderColor: color,
        type: 'line',
        fill: false,
        showLine: true,
        legend: {
              display: true,
              text: String
        },
        data: temp
      });
      this.myChart.update();

      //Push up
      temp = [];
      color = 'rgba('+(Math.random()*255)+','+(Math.random()*255)+','+(Math.random()*255)+',0.4)';
      min = 9999999999999;
      max = -1;

      for (var i = 200; i < 300; i++) {
        if(data[i].time >= startDate && data[i].time <= endDate){
          if(data[i].quantity >= max){
            max = data[i].quantity;
          }
          if(data[i].quantity <= min){
            min = data[i].quantity;
          }
          temp.push(data[i].quantity);
        }
      }
      console.log(data);
      console.log(max);
      console.log(min);

      for (var i = 0; i < temp.length; i++) {
        //Normalize
        temp[i] = 1 + ( temp[i] - min ) * (5 - 1)/ (max - min);
      }

      this.myChart.data.datasets.push({
        label: data[200].name,
        backgroundColor: color,
        borderColor: color,
        type: 'line',
        fill: false,
        showLine: true,
        legend: {
              display: true,
              text: String
        },
        data: temp
      });
      this.myChart.update();

    }

    clearGraph(){
      this.myChart = this.refs['canvas'].getChart();
      var size = this.myChart.data.datasets.length;
      for (var i = 0; i < size; i++) {
        this.myChart.data.datasets.pop();
      }
      this.myChart.data.labels = [];
      this.myChart.update();
    }

    /* Functions to retrive data from fitbit api, using axios. */
    retriveData(){

      //To get data from Fitbit api, need to oauth2 authentication. First send authentication request to get access token, and then using that token include in Bearer hearder to access data.
      // HELPFUL LINK FOR NEXT STAGE OF CHANGE: https://www.npmjs.com/package/passport-fitbit-oauth2
      // axios.get('https://api.fitbit.com/1/user/-/profile.json',{
      //  headers: {
      //    Authorization: auth
      //  }}).then((res) => {
      //    console.log("Personal data on: "+this.state.date);
      //    console.log(res);
      //
      // }).catch( (err) => {
      //   console.log(err);
      // });
      //
      // FOR Heart rate
      axios.get('https://api.fitbit.com/1/user/-/activities/heart/date/'+this.state.date+'/'+this.state.period+'/'+this.state.detail_level+'.json',{
       headers: {
         Authorization: auth
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
         this.myChart.data.datasets.push({
           label: "Heart Rate",
           backgroundColor: 'rgba(75,192,192,0.4)',
           borderColor: 'rgba(75,192,192,0.4)',
           type: 'line',
           fill: false,
           showLine: true,
           legend: {
                 display: true,
                 text: String
           },
           data: this.state.hr_data
         });
         this.myChart.data.labels = this.state.chart_labels;
         this.myChart.update();



      }).catch( (err) => {
        console.log(err);
      });
      //
      // // FOR SLEEP
      axios.get('https://api.fitbit.com/1/user/-/sleep/minutesAsleep/date/'+this.state.date+'/'+this.state.period+'.json',{
       headers: {
         Authorization: auth
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
         });
         
         this.myChart = this.refs['canvas'].getChart();
         this.myChart.data.datasets.push({
           label: "Sleep",
           backgroundColor: 'rgba(115,102,192,0.4)',
           borderColor: 'rgba(115,102,192,0.4)',
           type: 'line',
           fill: false,
           showLine: true,
           legend: {
                 display: true,
                 text: String
           },
           data: this.state.sl_data
         });
         this.myChart.update();


      }).catch( (err) => {
        console.log(err);
      });

      // FOR Calories
      axios.get('https://api.fitbit.com/1/user/-/activities/calories/date/'+this.state.date+'/'+this.state.period+'.json',{
       headers: {
         Authorization: auth
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
         });

         this.myChart = this.refs['canvas'].getChart();
         this.myChart.data.datasets.push({
           label: "Calories",
           backgroundColor: 'rgba(75,102,100,0.4)',
           borderColor: 'rgba(75,102,100,0.4)',
           type: 'line',
           fill: false,
           showLine: true,
           legend: {
                 display: true,
                 text: String
           },
           data: this.state.cl_data
         });
         this.myChart.update();


      }).catch( (err) => {
        console.log(err);
      });

      // FOR Steps
      axios.get('https://api.fitbit.com/1/user/-/activities/steps/date/'+this.state.date+'/'+this.state.period+'.json',{
       headers: {
         Authorization: auth
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
         });

         this.myChart = this.refs['canvas'].getChart();
         this.myChart.data.datasets.push({
           label: "Steps",
           backgroundColor: 'rgba(5,102,192,0.4)',
           borderColor: 'rgba(5,102,192,0.4)',
           type: 'line',
           fill: false,
           showLine: true,
           legend: {
                 display: true,
                 text: String
           },
           data: this.state.sp_data
         });
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
          period:e.target.value
      })
    }



    /* Handle action: update on input data, date, period, detail_level */
    handleUpdate(e){
      this.clearGraph();
      this.retriveData();
      this.retriveActivities();
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
                    <label>Period</label>
                    <input type="text" name="detail_level" onChange={this.handleRnageChange.bind(this)}/><label>Example: The period for which data will be returned. Options are 1d, 7d, 30d, 1w, 1m.</label>
                  </div>
                  <div>
                    <label>Detail_level</label>
                      <input type="text" name="period" onChange={this.handleDetailLevelChange.bind(this)}/><label>Example: Number of data points to include. Either 1sec or 1min.</label>
                  </div>
                  <input type="button" name="update" value="Update" onClick={this.handleUpdate.bind(this)}/>
                  <RC2 data={data} type='line' ref='canvas'/>

                  <Corelation data={data}/>

                </div>

              )
    }
}

export default FitbitData

// onSelectChanged(e){
//   console.log(e.target.value)
//   if(e.target.value === 'day'){
//     this.setState({
//         period:'1d',
//         chart_labels:[],
//         hr_data:[],
//         sl_data:[],
//         cl_data:[],
//         sp_data:[],
//         select_type:e.target.value
//     })
//   }
//   else if(e.target.value === 'week'){
//     this.setState({
//         period:'7d',
//         chart_labels:[],
//         hr_data:[],
//         sl_data:[],
//         cl_data:[],
//         sp_data:[],
//         select_type:e.target.value
//     })
//   }
//   else if(e.target.value === 'month'){
//     this.setState({
//         period:'1m',
//         chart_labels:[],
//         hr_data:[],
//         sl_data:[],
//         cl_data:[],
//         sp_data:[],
//         select_type:e.target.value
//     })
//   }
//   else if(e.target.value === 'year'){
//     this.setState({
//         period:'1y',
//         chart_labels:[],
//         hr_data:[],
//         sl_data:[],
//         cl_data:[],
//         sp_data:[],
//         select_type:e.target.value
//     })
//   }
//   this.clearGraph();
//   this.retriveData();
// }

// <div>
//   <input type="radio" id="select_day"
//    name="select" value="day" checked={this.state.select_type === 'day'} onChange={this.onSelectChanged.bind(this)} />
//   <label htmlFor="select_day">Daily</label>
//
//   <input type="radio" id="select_week"
//    name="select" value="week" checked={this.state.select_type === 'week'} onChange={this.onSelectChanged.bind(this)} />
//   <label htmlFor="select_week">Weekly</label>
//
//   <input type="radio" id="select_month"
//    name="select" value="month" checked={this.state.select_type === 'month'} onChange={this.onSelectChanged.bind(this)} />
//   <label htmlFor="select_month">Monthly</label>
//
//   <input type="radio" id="select_year"
//    name="select" value="year" checked={this.state.select_type === 'year'} onChange={this.onSelectChanged.bind(this)} />
//   <label htmlFor="select_year">Yearly</label>
// </div>
