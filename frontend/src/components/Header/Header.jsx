import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import styles from './style.scss'

/* Header class */
export const Header = (prpos) => {
    return(
    	<div className="nav">
	    	<nav>
	    		<Link to={"/"}><Button className="nav-bar">Home</Button></Link>
	    		<Link to={"/login"}><Button className="nav-bar">Login</Button></Link>
	    		<Link to={"/dashboard"}><Button className="nav-bar">dashboard</Button></Link>
          <Link to={"/fitbitData"}><Button className="nav-bar">fitbit data</Button></Link>
	    	</nav>
    	</div>
	)

}

export default Header
