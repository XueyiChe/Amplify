import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem';

const navigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/">Burger Builder</NavigationItem>
		<NavigationItem link="/orders">Order</NavigationItem>
		<NavigationItem link="/timer">Timer</NavigationItem>
	</ul>
);

export default navigationItems;
