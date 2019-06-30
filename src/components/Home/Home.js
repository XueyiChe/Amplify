import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Home.css';
import './Animation.css';
import Jumbotron from './Jumbotron';
import Introduction from './Content';
export default class home extends React.Component {
	render() {
		return (
			<div className={classes.homePage}>
				<Jumbotron />
				<Introduction />
			</div>
		);
	}
}
