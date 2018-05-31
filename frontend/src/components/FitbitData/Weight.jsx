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

class Weight extends Component {

    constructor() {
        super();
        this.state = {
          user: {
              password: '',
              email: ''
          },
          select_type:'week',
        	date:"2018-04-28",
          period:"30d",
          detail_level:"1min",
          chart_labels:[],
           weight_data:[],
           activity:[]
        }

        this.clearGraph = this.clearGraph.bind(this);
        this.retriveToken = this.retriveToken.bind(this);
        this.retriveData = this.retriveData.bind(this);
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
      
      axios.get('https://api.fitbit.com/1/user/-/body/log/weight/date/'+this.state.date+'/'+this.state.period+'.json',{
       headers: {
         Authorization: auth
       }}).then((res) => {
         console.log("Weight log on: "+this.state.date);
         console.log(res.data);

         var temp_data  = [];
         var temp_label  = [];

         for (var i = 0; i < res.data['weight'].length; i++) {
           temp_data.push(res.data['weight'][i]['weight']);
           temp_label.push(res.data['weight'][i]['date']);
         }

         this.setState({
             weight_data:temp_data,
             chart_labels:temp_label
         });

         this.myChart = this.refs['canvas'].getChart();
         this.myChart.data.datasets.push({
           label: "Weight",
           backgroundColor: 'rgba(75,33,100,0.4)',
           borderColor: 'rgba(75,33,100,0.4)',
           type: 'line',
           fill: false,
           showLine: true,
           legend: {
                 display: true,
                 text: String
           },
           data: this.state.weight_data
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

export default Weight
