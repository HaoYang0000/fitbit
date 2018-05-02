import React, { Component } from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

/* Leave for register and login, save fo later */
class Home extends Component {

    render() {
        return(
            <div className="Home">
                  <Link to={"/sleep"}>
                    <div className="home-menu-item">
                      <Icon name='moon' size="massive" color="blue" className="inner-content"/>
                      <br/>
                      Sleep
                    </div>
                  </Link>
                  <Link to={"/heartrate"}>
                    <div className="home-menu-item">
                      <Icon name='heartbeat' size="massive" color="red" className="inner-content"/>
                      <br/>
                      HeartRate
                    </div>
                  </Link>
                  <Link to={"/step"}>
                    <div className="home-menu-item">
                      <Icon name='blind' size="massive" color="yellow" className="inner-content"/>
                      <br/>
                      Steps
                    </div>
                  </Link>
                  <Link to={"/weight"}>
                    <div className="home-menu-item">
                      <Icon name='food' size="massive" color="brown" className="inner-content"/>
                      <br/>
                      Weight
                    </div>
                  </Link>
                  <Link to={"/calories"}>
                    <div className="home-menu-item">
                      <Icon name='fire' size="massive" color="orange" className="inner-content"/>
                      <br/>
                      Calories
                    </div>
                  </Link>
                  <Link to={"/fitbitData"}>
                    <div className="home-menu-item">
                      <Icon name='dashboard' size="massive" color="black" className="inner-content"/>
                      <br/>
                      Overall
                    </div>
                  </Link>

            </div>
        )
    }
}

export default Home
