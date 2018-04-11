import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';


import Header from './components/Header/Header.jsx';
import Layout from './components/Layout/Layout.jsx';

import styles from './styles/main.scss';

ReactDom.render(
	<BrowserRouter>
		<div>
		    <Header />
		    <Layout />
		</div>
	</BrowserRouter>,
    document.getElementById('react-app')
);
