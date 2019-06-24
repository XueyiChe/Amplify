import React from 'react';
import classes from './Logo.css';

const logo = (props) => (
	<div className={classes.Logo} style={{ height: props.height }}>
		<img src="assets/burger-logo.png" />
	</div>
);

export default logo;
