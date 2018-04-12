import React, { Component } from 'react'

import styles from './styles.scss'

/* This class is for individual button  */
class ActivityItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	isToggleOn: true
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    //Example of how to switch class using Reactjs
  	var btnClass = 'item-';
  	if (this.state.isToggleOn) btnClass += 'on';
	    else btnClass += 'off';

    return (
      <button onClick={this.handleClick} className={btnClass}>
        {this.state.isToggleOn ? this.props.name : 'OFF'}
      </button>
    );
  }
}

export default ActivityItem
