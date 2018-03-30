import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';


import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';

import styles from './styles/main.scss';

ReactDom.render(
	<BrowserRouter>
		<div>
		    <Header />
		    <Main />
		</div>
	</BrowserRouter>,
    document.getElementById('react-app')
);
