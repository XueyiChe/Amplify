import React from 'react';
import { Nav } from 'react-bootstrap';
import classes from './WorkoutType.css';

const workoutTypeArr = [ 'Cardio', 'Anaerobic', 'Classes' ];

const WorkoutType = (props) => {
	const workoutTypes = workoutTypeArr.map((type) => (
		<Nav.Item key={type}>
			<Nav.Link eventKey={type} onClick={() => props.ifchanged(type)}>
				{type}
			</Nav.Link>
		</Nav.Item>
	));
	return (
		<Nav className={classes.WorkoutType} variant="tabs" defaultActiveKey={workoutTypeArr[0]}>
			{workoutTypes}
		</Nav>
	);
};

export default WorkoutType;
