import React from 'react';
import classes from './Workout.css';

const Workout = (props) => {
	return (
		<tr className={classes.Workout}>
			<th width="70%">{props.workout}</th>
			<th className={classes.time} width="30%">
				{props.time}
			</th>
		</tr>
	);
};

export default Workout;
