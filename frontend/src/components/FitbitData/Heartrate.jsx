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

const auth = 'Bearer '+'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2RFRSV04iLCJhdWQiOiIyMkNOVzIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNTI1MzA2NjAzLCJpYXQiOjE1MjQ3MDE4MDN9.tMmLyFZnkb4FlzFFH35XvfhIRT90TcDIQKA5R01sN2Y';

class Heartrate extends Component {

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
           hr_data:[],
           activity:[]
        }

        this.clearGraph = this.clearGraph.bind(this);
        this.retriveData = this.retriveData.bind(this);
    }

    componentDidMount(){
      this.clearGraph();

      this.retriveData();
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

    retriveData(){
      // FOR Calories
      axios.get('https://api.fitbit.com/1/user/-/activities/heart/date/'+this.state.date+'/'+this.state.period+'/'+this.state.detail_level+'.json',{
       headers: {
         Authorization: auth
       }}).then((res) => {
         console.log("Heartrate log on: "+this.state.date);
         console.log(res.data);

         var temp_data  = [];
         var temp_label  = [];

         for (var i = 0; i < res.data['activities-heart'].length; i++) {
           temp_data.push(res.data['activities-heart'][i]['value']['restingHeartRate']);
           temp_label.push(res.data['activities-heart'][i]['dateTime']);
         }

         this.setState({
             hr_data:temp_data,
             chart_labels:temp_label
         });

         this.myChart = this.refs['canvas'].getChart();
         this.myChart.data.datasets.push({
           label: "Heart Rate",
           backgroundColor: 'rgba(75,192,192,0.4)',
           borderColor: 'rgba(75,192,192,0.4)',
           type: 'bar',
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
      this.retriveActivities();
    }

    render() {
        return(
            <div className="container">
              <div className="inner-container">
                <RC2 data={data}
                type='bar'
                ref='canvas'/>
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
            </div>
        )
    }
}

export default Heartrate
