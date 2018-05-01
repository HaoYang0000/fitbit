import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import styles from './styles.scss'

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

export default Login
