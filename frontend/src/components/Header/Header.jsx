import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import styles from './style.scss'


class Header extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.currentUser)
        this.state = {
            user: [],
            currentUser: this.props.currentUser,
            message: ''
        }
        this.logOut = this.logOut.bind(this);
        // this.handleUpdateActivity = this.handleUpdateActivity.bind(this);
    }

    componentDidMount() {
       console.dir(this);
        axios.get('/api/get_current_user').then((res) => {
            console.log("aaa");
            console.log(res);
            console.log("aaa");
            // this.setState({
            //     currentUser: temp
            // })
        }).catch((err) => {
          console.log(err);
            // this.setState({
            //     id:res.data.user.id,
            //     currentUser: {email:res.data.user.email}
            // })
        });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ currentUser: nextProps.currentUser });
    }

    logOut() {
        axios.get('/api/logout').then( (res) => {
          this.setState({
              currentUser:""
          })
            console.log("Logged out");
        })
    }




    render() {

        if (this.state.currentUser === "" || this.state.currentUser === undefined) {
            return(
              <div className="nav">
                <nav>
                  <Link to={"/home"}><Button className="nav-bar">Home</Button></Link>

                  <Link to={"/dashboard"}><Button className="nav-bar">dashboard</Button></Link>
                  <Link to={"/fitbitData"}><Button className="nav-bar">fitbit data</Button></Link>


                  <Link to={"/login"} ><Button className="nav-user">Login</Button></Link>
                  <Link to={"/register"} ><Button className="nav-user">Register</Button></Link>

                </nav>
              </div>
            )
        } else {
            return(
              <div className="nav">
                <nav>
                  <Link to={"/home"}><Button className="nav-bar">Home</Button></Link>

                  <Link to={"/dashboard"}><Button className="nav-bar">dashboard</Button></Link>
                  <Link to={"/fitbitData"}><Button className="nav-bar">fitbit data</Button></Link>

                  <h1 className="nav-user">Hello, {this.state.currentUser}</h1>
                  <Link to={"/"} ><Button className="nav-user" onClick={this.logOut}>Logout</Button></Link>

                </nav>
              </div>
            )
        }



    }
}

export default Header
