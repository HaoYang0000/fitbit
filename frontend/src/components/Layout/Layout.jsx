import React, { Component } from 'react'
import ReactDom from 'react-dom';

import Routes from './Routes.jsx';
import Header from '../Header/Header.jsx';

class Layout extends Component {
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

  }

    render() {
      return(
        <div >
            <Header currentUser={this.state.user.email}/>
            <Routes/>
        </div>

      )
    }
}

export default Layout
