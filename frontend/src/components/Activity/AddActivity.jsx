import React, { Component } from 'react'

import axios from 'axios'
import { Button, Input, Card } from 'semantic-ui-react'
import styles from './styles.scss'

import ActivityItem from "./ActivityItem.jsx";


class AddActivity extends Component {
    constructor() {
    	super();
        this.state = {
	    	items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
	 	};
    }



    // onSubmit(e) {
    //     e.preventDefault();

    //     // create a string for an HTTP body message
    //     const name = encodeURIComponent(this.state.user.username);
    //     const email = encodeURIComponent(this.state.user.email);
    //     const password = encodeURIComponent(this.state.user.password);
    //     const formData = `name=${name}&email=${email}&password=${password}`;

    //     // create an AJAX POST request (This should probably done with Axios instead)
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('post', '/api/register');
    //     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //     xhr.responseType = 'json';
    //     xhr.addEventListener('load', () => {
    //         if (xhr.status === 200) {
    //             console.log('The form is valid');
    //             this.setState({
    //                 message: 'Registered!'
    //             })
    //         } else {
    //             this.setState({
    //                 message: 'Unable to register'
    //             })
    //         }
    //     });
    //     xhr.send(formData);
    // }


    render() {

        return(
        	<div className="center" >
        		<ActivityItem name={"Run"}/>
        		<ActivityItem name={"Walk"}/>
        		<ActivityItem name={"Yoga"}/>
        	</div>
    	)
	}
}

export default AddActivity
