import React, { Component } from 'react'
// import classNames from 'classnames/bind';

import styles from './styles.scss'


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
