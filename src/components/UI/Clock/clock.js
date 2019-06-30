import React, { Component } from 'react';
import classes from './clock.css';

const clock = (props) => (
	<div className={classes.clock}>
		<div className={classes.time}>
			<p>{props.time}</p>
		</div>
	</div>
);

export default clock;
