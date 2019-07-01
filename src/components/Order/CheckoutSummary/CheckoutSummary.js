import React from 'react';
import Workout from '../../Workout/WorkoutSport/Workout';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
	return (
		<div className={classes.checkoutSummary}>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Workout sport={props.sport} />
			</div>
			<Button btnType="Danger" clicked={props.checkoutCancel}>
				Cancel
			</Button>
			<Button btnType="Success" clicked={props.checkoutContinue}>
				Submit
			</Button>
		</div>
	);
};

export default checkoutSummary;
