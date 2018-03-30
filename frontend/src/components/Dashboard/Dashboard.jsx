import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
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


                </div>
            )
        } else {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>You must log in before you can see this page.</h1>
                        <Link to="/">
                            Back
                        </Link>
                    </Card>
                </div>
            )
        }
    }
}

export default Dashboard
