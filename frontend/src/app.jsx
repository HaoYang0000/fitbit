import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout.jsx';

import styles from './styles/main.scss';


ReactDom.render(
		<BrowserRouter>
			<Layout />
		</BrowserRouter>,
    document.getElementById('react-app')
);
