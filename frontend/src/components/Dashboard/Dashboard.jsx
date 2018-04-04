import React, { Component } from 'react'
import { Button, Icon, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'


class Dashboard extends Component {

    constructor() {
        super();

        this.state = {
            isLoggedIn: true,
            message: ''
        }

    }

    render() {

        if (this.state.isLoggedIn) {
            return(
                <div>
                    <div className="plus-activity-icon">
                        <Icon name='plus circle' size='massive'/>
                    </div>
                    


                </div>
            )
        } else {
            return(
                <div>
                    
                </div>
            )
        }
    }
}

export default Dashboard
