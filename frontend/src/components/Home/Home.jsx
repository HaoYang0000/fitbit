import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

/* Leave for register and login, save fo later */
class Home extends Component {

    render() {
        return(
            <div>
                <div className="Home">
                <ul className="rectangle-17-m">
<li>Overall</li>
</ul>
<ul className="rectangle-17-m">
<li>Rate</li>
</ul>
<ul className="rectangle-17-m">
<li>Calories</li>
</ul>
<ul className="rectangle-17-m">
<li>Steps</li>
</ul>
<ul className="rectangle-17-m">
<li>Sleep</li>
</ul>
<ul className="rectangle-17-m">
<li>Weight</li>
</ul>
<ul className="rectangle-17">
<li>
</li>
<li>My Health Buddy</li>
</ul>
                </div>
            </div>
        )
    }
}

export default Home
