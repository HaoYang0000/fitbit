import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Card, Icon } from 'semantic-ui-react'
import axios from 'axios'
import styles from './style.scss'
import Popup from "reactjs-popup";

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
        this.handleAddActivity = this.handleAddActivity.bind(this);
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

    handleAddActivity(e){
      let name = document.getElementById('activity_name').value;
      let category = "SPORT";
      let quantity = document.getElementById('activity_quantitiy').value;
      let date = document.getElementById('activity_date').value;
      let intensity = document.getElementById('activity_intensity').value;
      let start_time = document.getElementById('activity_start_time').value;
      let finish_time = document.getElementById('activity_finish_time').value;

      if(date.toUpperCase() === 'NOW'){
        date = new Date();
      }

      if(start_time.toUpperCase() === 'NOW'){
          var today = new Date();
          var h = today.getHours();
          var m = today.getMinutes();
          var s = today.getSeconds();
          // add a zero in front of numbers<10
          if(m < 10){
            m = "0"+ m;
          }
          if(s < 10){
            s = "0"+ s;
          }
          start_time = h + ":" + m + ":" + s;
      }

      console.log(name);
      console.log(category);
      console.log(quantity);
      console.log(date);
      console.log(intensity);
      console.log(start_time);
      console.log(finish_time);

      axios.post('/api/create_new_activity', {
            name: name,
            category: category,
            quantity: quantity,
            date: date,
            intensity: intensity,
            start_time: start_time,
            finish_time: finish_time,
            user_id: 1
          })
          .then(res => {

            if(res.status == 200){
                console.log("succesful");
            } else {
                this.setState({
                     message: 'Unable to create!'
                 });
            }
          })
          .catch(function (error) {
            console.log("error" + error);
        });

    }




    render() {

        if (this.state.currentUser === "" || this.state.currentUser === undefined) {
            return(
              <div>
              <div className="nav">
                <nav>
                  <Link to={"/"}><Icon name='list' className="nav-bar" /></Link>
                  <Link to={"/home"}><Button className="nav-bar">Home</Button></Link>


                  <Link to={"/login"} ><Button className="nav-user" >Login</Button></Link>
                  <Link to={"/register"} ><Button className="nav-user">Register</Button></Link>

                </nav>
              </div>
              <div className="bottom-menu">
                <Icon circular name='grid layout' inverted  size="large" className="bottom-menu-icon"/>
                <Link to={"/fitbitData"}>
                  <div className="bottom-menu-link1">
                    <Icon circular name='dashboard' size="large" inverted color="black"/>
                  </div>
                </Link>
                <Link to={"/heartrate"}>
                  <div className="bottom-menu-link2">
                    <Icon circular name='heartbeat' size="large" inverted color="red"/>
                  </div>
                </Link>
                <Link to={"/step"}>
                  <div className="bottom-menu-link3">
                    <Icon circular name='blind' size="large" inverted color="yellow"/>
                  </div>
                </Link>
                <Link to={"/weight"}>
                  <div className="bottom-menu-link4">
                    <Icon circular name='food' size="large" inverted color="brown"/>
                  </div>
                </Link>
                <Link to={"/calories"}>
                  <div className="bottom-menu-link5">
                    <Icon circular name='fire' size="large" inverted color="orange"/>
                  </div>
                </Link>
                <Link to={"/sleep"}>
                  <div className="bottom-menu-link6">
                    <Icon circular name='moon' size="large" inverted color="blue"/>
                  </div>
                </Link>
                <Link to={"/dashboard"}>
                  <div className="bottom-menu-link7">
                    <Icon circular name='archive' size="large" inverted color="blue"/>
                  </div>
                </Link>
                <Popup trigger={<Icon circular name='plus circle' size='large' inverted color="green" className="bottom-menu-link8" />} position="left center" closeOnDocumentClick>
                                                {close => (
                                                  <div className="popup-modal">
                                                    <a className="close" onClick={close}>
                                                      &times;
                                                    </a>
                                                    <div className="header">
                                                      <h1>Add an Activity</h1>
                                                    </div>
                                                    <div className="content">
                                                      <div className="item">
                                                        <h4>Activity Name: </h4>
                                                        <input type="text" name="activity_name" id='activity_name'/>
                                                      </div>
                                                      <div className="item">
                                                        <h4>Quantitiy: Example: Number of finished activity, e.g. 20 for pushup</h4>
                                                        <input type="text" name="activity_quantitiy" id='activity_quantitiy'/>
                                                      </div>
                                                      <div className="item">
                                                        <h4>Date: Example: The date, in the format yyyy-MM-dd or today.</h4>
                                                        <input type="text" name="activity_date" id='activity_date'/>
                                                      </div>
                                                      <div className="item">
                                                        <h4>Intensity: </h4>
                                                        <select  name="activity_intensity" id='activity_intensity' defaultValue="2">
                                                          <option value="1">Very Intense</option>
                                                          <option value="2">Normal</option>
                                                          <option value="3">Easy</option>
                                                        </select>
                                                      </div>
                                                      <div className="item-optional">
                                                        <h4>Start Time (Optional): Example: The start time, in the format HH:MM:SS or now.</h4>
                                                        <input type="text" name="activity_start_time" id='activity_start_time'/>
                                                      </div>
                                                      <div className="item-optional">
                                                        <h4>Finish Time (Optional): Example: The start time, in the format HH:MM:SS.</h4>
                                                        <input type="text" name="activity_finish_time" id='activity_finish_time'/>
                                                      </div>
                                                    <div>
                                                      <input type="button" name="submit_activity" value="Submit" onClick={this.handleAddActivity.bind(this)}/>
                                                    </div>

                                                    </div>

                                                  </div>
                                                )}
                  </Popup>

              </div>


              </div>
            )
        } else {
            return(
              <div className="nav">
                <nav>
                  <Link to={"/home"}><Button className="nav-bar">Home</Button></Link>

                  <h1 className="nav-user">Hello, {this.state.currentUser}</h1>
                  <Link to={"/"} ><Button className="nav-user" onClick={this.logOut}>Logout</Button></Link>

                </nav>
              </div>
            )
        }



    }
}

class Login extends Component {

    constructor() {
        super();



        this.state = {
            user: {
                password: '',
                email: ''
            },
            isLoggedIn: false,
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(e) {
        e.preventDefault();

        const email = encodeURIComponent(document.getElementById('email').value);
        const password = encodeURIComponent(document.getElementById('password').value);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log(xhr.response.user);
                this.setState({
                    message: 'Successfully logged in!',
                    user:{
                      email:xhr.response.user
                    },
                    isLoggedIn:true
                })
            } else {
                this.setState({
                    message: 'Unable to log in'
                })
            }
        });
        xhr.send(formData);
    }


    render() {
        return(
            <div>

            <form className="Login" action="/" onSubmit={this.onSubmit}>
                <Card className="Login__content">
                    <div>
                        <h1>Login</h1>
                        <Input label="Email" id="email"  />
                        <br/><br/>
                        <Input label="Password" id="password"  />
                        <br/><br/>

                        <p>{this.state.message}</p>
                        <Input type="submit" />
                        <h4>No account yet? Click <Link to="/register">here</Link> to Register!</h4>

                    </div>
                </Card>
            </form>
        </div>
    )
}
}

class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const email = encodeURIComponent(document.getElementById('email').value);
        const password = encodeURIComponent(document.getElementById('password').value);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX POST request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                this.setState({
                    message: 'Registered!'
                })
            } else {
                this.setState({
                    message: 'Unable to register'
                })
            }
        });
        xhr.send(formData);

    }

    render() {
        return(
          <div>
            <form className="Register" action="/" onSubmit={this.onSubmit}>
                <Card className="Register__content">
                    <div>
                        <h1>Register</h1>
                        <Input label="Email" id="email"  />
                        <br/><br/>
                        <Input label="Password" id="password"  />
                        <br/><br/>
                        <p>{this.state.message}</p>
                        <Input type="submit" />
                        <h4>Already registered? Click <Link to="/login">here</Link> to Log-in!</h4>

                    </div>
                </Card>
            </form>
        </div>
    )
}
}


export default Header
