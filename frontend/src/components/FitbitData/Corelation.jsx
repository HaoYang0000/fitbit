import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Corelation extends Component {
  constructor(props) {
    super(props);
    console.log("aaa");
    console.log(this.props.data);
    this.state = {
      datasets: this.props.data.datasets,
      labels:this.props.data.labels,
      target:'',
      corelations:[]
    }
    console.log(this.state.datasets);

    this.PearsonCorelation = this.PearsonCorelation.bind(this);
    this.Covariance = this.Covariance.bind(this);
    this.Standardeviaion = this.Standardeviaion.bind(this);
    this.Average = this.Average.bind(this);
  }

  handleCorelationChange(e){
    this.setState({
      target:e.target.value
    });

    var index = 0;
    //Find the target index
    for (var i = 0; i < this.state.datasets.length; i++) {
      if(this.state.datasets[i].label == e.target.value){
        index = i;
      }
    }

    var corelations = [];
    //Compare
    for (var i = 0; i < this.state.datasets.length; i++) {
      if(index != i){
        var value = this.PearsonCorelation(this.state.datasets[index].data,this.state.datasets[i].data);

        var temp = {label:this.state.datasets[i].label,data:value};
        corelations.push(temp);
      }
    }
    console.log(corelations);
    //Sort
    for (var i = 0; i < corelations.length; i++) {
      for (var j = i+1 ; j < corelations.length; j++) {
        if(corelations[i].data <= corelations[j].data){
          var temp = corelations[i];
          corelations[i] = corelations[j];
          corelations[j] = temp;
        }
      }
    }

    this.setState({
      corelations:corelations
    });

  }

  componentDidMount(){
      console.log("ccc");
      console.log(document.getElementById("select_bar").value);
      console.log("ccc");
      // this.setState({
      //   corelations:corelations
      // });
  }

  PearsonCorelation(x,y){
    var n = y.length;
    var x_avg = this.Average(x);
    var y_avg = this.Average(y);

    var x_stand = this.Standardeviaion(x);
    var y_stand = this.Standardeviaion(y);

    return this.Covariance(x,y)/(x_stand*y_stand);
  }

  Covariance(x,y){
    var x_avg = this.Average(x);
    var y_avg = this.Average(y);

    var sum = 0;

    for (var i = 0; i < y.length; i++) {
      sum = sum + (x[i]-x_avg)*(y[i]-y_avg)
    }

    return sum/(y.length-0.00)
  }

  Standardeviaion(x){
    var x_avg = this.Average(x);
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
      sum = sum + (x[i]-x_avg)*(x[i]-x_avg);
    }

    return Math.sqrt((sum/(x.length-1) ));
  }

  Average(x){
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
      sum = x[i] + sum;
    }

    return sum/x.length;
  }

    render() {
      let items = this.state.datasets.map(item =>{
        return <option key={item.label} value={item.label}>{item.label}</option>
      })

      let corelations = this.state.corelations.map(item =>{
        return <div key={item.label} className="corelations-item">{item.label}:{item.data}</div>
      })


        return(
            <div>
              Corelations of :
              <select id="select_bar" onChange={this.handleCorelationChange.bind(this)}>
                {items}
              </select>


              <div className="corelations-container">
                <div className="corelations-left">
                  {corelations}
                </div>
                <div className="corelations-right">

                </div>

              </div>
            </div>
        )
    }
}

export default Corelation
