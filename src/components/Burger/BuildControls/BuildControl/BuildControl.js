import React from 'react';
import classes from './BuildControl.css';
import Clock from '../../../UI/Clock/clock';

const buildControl = (props) => {
	return (
		<div className={classes.BuildControl}>
			<button className={classes.Less} onClick={props.removed} disabled={props.disabled}>
				<b>-</b>
			</button>
			<div className={classes.Label}>{props.label}</div>
			<Clock time={props.time} />
			<button className={classes.More} onClick={props.added}>
				<b>+</b>
			</button>
		</div>
	);
};

export default buildControl;
