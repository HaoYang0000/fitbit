import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import styles from './style.scss'

export const Header = (prpos) => {
    return(
    	<div className="nav">
	    	<nav>
	    		<Link to={"/"}><Button className="nav-bar" inverted color='yellow' size='mini'>Home</Button></Link>
	    		<Link to={"/login"}><Button className="nav-bar" inverted color='yellow' size='mini'>Login</Button></Link>
	    		<Link to={"/dashboard"}><Button className="nav-bar" inverted color='yellow' size='mini'>dashboard</Button></Link>
	    	</nav>
    	</div>
	)
   
}

export default Header