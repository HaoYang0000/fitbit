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

class Step extends Component {

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
           sp_data:[],
           activity:[]
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
      axios.get('https://api.fitbit.com/1/user/-/activities/steps/date/'+this.state.date+'/'+this.state.period+'.json',{
       headers: {
         Authorization: auth
       }}).then((res) => {
         console.log("Steps log on: "+this.state.date);
         console.log(res.data);

         var temp_data  = [];
         var temp_label  = [];

         for (var i = 0; i < res.data['activities-steps'].length; i++) {
           temp_data.push(res.data['activities-steps'][i]['value']);
           temp_label.push(res.data['activities-steps'][i]['dateTime']);
         }

         this.setState({
             sp_data:temp_data,
             chart_labels:temp_label
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

export default Step
