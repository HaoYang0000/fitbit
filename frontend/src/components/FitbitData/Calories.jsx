import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import style from './style.scss'
import RC2 from 'react-chartjs2';
import axios from 'axios'

const data = {
    labels: [],
    datasets: [
  ]
};

var auth = 'Bearer ';

class Calories extends Component {

    constructor() {
        super();
        this.state = {
          user: {
              password: '',
              email: ''
          },
          select_type:'week',
        	date:"2018-04-24",
          period:"7d",
          detail_level:"1min",
          chart_labels:[],
           cl_data:[],
           activity:[],
           cl_data_average:0
        }

        this.clearGraph = this.clearGraph.bind(this);
        this.retriveData = this.retriveData.bind(this);
        this.retriveToken = this.retriveToken.bind(this);

    }

    componentDidMount(){
      this.retriveToken();

    }

    retriveToken(){
      axios.get('/api/get_user_token/1').then((res) => {
        console.log(res.data);
        auth = auth + res.data.user.token;

        this.clearGraph();

        this.retriveData();

      }).catch( (err) => {
        console.log("Can not retrive data");
      });
    }

    retriveData(){
      axios.get('https://api.fitbit.com/1/user/-/activities/calories/date/'+this.state.date+'/'+this.state.period+'.json',{
       headers: {
         Authorization: auth
       }}).then((res) => {
         console.log("Calories log on: "+this.state.date);
         console.log(res.data);

         var temp_data  = [];
         var temp_label  = [];

         for (var i = 0; i < res.data['activities-calories'].length; i++) {
           temp_data.push(res.data['activities-calories'][i]['value']);
           temp_label.push(res.data['activities-calories'][i]['dateTime']);
         }

         var sum = 0;
         for (var i = 0; i < temp_data.length; i++) {
           sum+=parseInt(temp_data[i]);
         }
         sum = sum/temp_data.length;

         this.setState({
             cl_data:temp_data,
             chart_labels:temp_label,
             cl_data_average: sum
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
         this.myChart.data.labels = this.state.chart_labels;
         this.myChart.update();


      }).catch( (err) => {
        console.log(err);
      });
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

    handleRangeChange(e){
      this.setState({
          period:e.target.value
      })
    }

    handleUpdate(e){
      this.clearGraph();
      this.retriveData();
    }

    render() {
        return(
            <div className="container">
              <div className="inner-container">
                <RC2 data={data} type='line' ref='canvas'/>
              </div>
              <div className="right-container">
                <h3>Edit Parameters</h3>
                <div>
                  <label>Date: </label>
                  <input type="text" name="date" onChange={this.handleDateChange.bind(this)}/>
                  <br/>
                  <label>Example: The date, in the format yyyy-MM-dd or today.</label>
                </div>
                <div>
                  <label>Period: </label>
                  <input type="text" name="detail_level" onChange={this.handleRangeChange.bind(this)}/>
                  <br/>
                  <label>Example: The period for which data will be returned. Options are 1d, 7d, 30d, 1w, 1m.</label>
                </div>
                <div>
                  <label>Detail level: </label>
                  <input type="text" name="period" onChange={this.handleDetailLevelChange.bind(this)}/>
                  <br/>
                  <label>Example: Number of data points to include. Either 1sec or 1min.</label>
                </div>
                <br/>
                <input type="button" name="update" value="Update" onClick={this.handleUpdate.bind(this)}/>

              </div>
              <div className="right-bottom-container">
                <h3>Your Goal for Calorites Consumption: </h3>
                <div>
                  <label>Your Average Calories Consumption: </label>
                  <input type="text" name="detail_level" value={this.state.cl_data_average} disabled="true"/>
                  <br/>
                  <label>Your Desired Calories Consumption: </label>
                  <input type="text" name="detail_level" defaultValue={2500}/>
                  <br/>
                </div>
              </div>
            </div>
        )
    }
}

export default Calories
