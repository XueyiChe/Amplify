import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

const navigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/">Home</NavigationItem>
		<NavigationItem link="/portfolios">Portfolios</NavigationItem>
	</ul>
);

export default navigationItems;
