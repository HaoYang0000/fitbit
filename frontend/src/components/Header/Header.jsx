import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Card } from 'semantic-ui-react'
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
              <div>
              <div className="nav">
                <nav>
                  <Link to={"/home"}><Button className="nav-bar">Home</Button></Link>

                  <Link to={"/dashboard"}><Button className="nav-bar">dashboard</Button></Link>
                  <Link to={"/fitbitData"}><Button className="nav-bar">fitbit data</Button></Link>


                  <Link to={"/login"} ><Button className="nav-user" >Login</Button></Link>
                  <Link to={"/register"} ><Button className="nav-user">Register</Button></Link>

                </nav>
              </div>
              

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
