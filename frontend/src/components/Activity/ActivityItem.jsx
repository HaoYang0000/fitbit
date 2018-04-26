import React, { Component } from 'react'
import styles from './styles.scss'
import axios from 'axios'

/* This class is for individual button  */
class ActivityItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	isToggleOn: true
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  handleDelete(e) {
    console.log(this.props.id)
    axios.post('/api/delete_activity', {
            id: this.props.id
        })
        .then(res => {
           if(res.status == 200){
               window.location.reload();
            } else {
               window.location.reload();
            }
          })
          .catch(function (error) {
            console.log("error" + error);
        });
  }

  render() {
    //Example of how to switch class using Reactjs
  	var btnClass = 'item-';
  	if (this.state.isToggleOn) btnClass += 'on';
	    else btnClass += 'off';

    return (
      <div >
      <button onClick={this.handleClick} className={btnClass}>
        {this.state.isToggleOn ? this.props.name : this.props.quantity}
      </button>
      <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

export default ActivityItem
