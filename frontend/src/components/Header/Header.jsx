import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import styles from './style.scss'

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: [],
            message: ''
        }
        // this.handleUpdateActivity = this.handleUpdateActivity.bind(this);
    }



    render() {

      return(
        <div className="nav">
          <nav>
            <Link to={"/home"}><Button className="nav-bar">Home</Button></Link>

            <Link to={"/dashboard"}><Button className="nav-bar">dashboard</Button></Link>
            <Link to={"/fitbitData"}><Button className="nav-bar">fitbit data</Button></Link>

            <Link to={"/login"}><Button className="nav-user">Login</Button></Link>
          </nav>
        </div>
      )
    }
}

export default Header
