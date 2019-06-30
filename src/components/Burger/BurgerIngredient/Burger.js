import React from 'react';
import classes from './Burger.css';
import { withRouter } from 'react-router-dom';
import Workout from './Workout/Workout';
const burger = (props) => {
	const timeFormat = (time) => {
		if (Number.isInteger(time)) {
			if (time < 10) {
				return '0' + time + ':00';
			}
			return time + ':00';
		} else {
			return time.floor() + ':' + (time % 1).toFixed(2) * 60;
		}
	};

	const controls = {
		row: 'Seated Row',
		elliptical: 'Elliptical',
		cycling: 'Cycling',
		hip_leg: 'Hip-Leg',
		arm: 'Arm',
		back_breast: 'Back-Breast',
		swam_arm: 'Swam Arm',
		swam_leg: 'Swam Leg',
		zoey_ab: 'Zoey Ab',
		zoey_back: 'Zoey Back'
	};

	let workout = Object.keys(props.ingredient).map((woKey) => {
		if (props.ingredient[woKey] !== 0) {
			return <Workout workout={controls[woKey]} time={timeFormat(props.ingredient[woKey])} key={woKey} />;
		}
	});

	let workoutTable = (
		<div className={classes.workoutDetail}>
			<h4>
				<strong>Your Workout</strong>
			</h4>
			<table>
				<thead />
				<tbody> {workout} </tbody>
			</table>
		</div>
	);

	if (props.totalPrice == 0) {
		workoutTable = (
			<h4>
				<strong>Go for work!</strong>
			</h4>
		);
	}

	return <div className={classes.Burger}>{workoutTable}</div>;
};

export default withRouter(burger);
