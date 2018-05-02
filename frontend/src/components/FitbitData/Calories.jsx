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
           activity:[]
        }

        this.clearGraph = this.clearGraph.bind(this);

    }

    componentDidMount(){
      this.clearGraph();
      // FOR Calories
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

         this.setState({
             cl_data:temp_data,
             chart_labels:temp_label
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

    render() {
        return(
            <div className="container">
              <div className="inner-container">
                <RC2 data={data} type='line' ref='canvas'/>
              </div>
            </div>
        )
    }
}

export default Calories