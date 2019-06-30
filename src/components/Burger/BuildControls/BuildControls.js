import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import nav from 'react-bootstrap';

const controls = [
	{ label: 'Seated Row', name: 'row', time: '5', type: 'Cardio' },
	{ label: 'Elliptical ', name: 'elliptical', time: '10', type: 'Cardio' },
	{ label: 'Cycling', name: 'cycling', time: '10', type: 'Cardio' },
	{ label: 'Hip-Leg', name: 'hip_leg', time: '3', type: 'Anaerobic' },
	{ label: 'Arm', name: 'arm', time: '3', type: 'Anaerobic' },
	{ label: 'Swam Arm', name: 'swam_arm', time: '15', type: 'Classes' },
	{ label: 'Swam Leg', name: 'swam_leg', time: '18', type: 'Classes' },
	{ label: 'Zoey Ab', name: 'zoey_ab', time: '12', type: 'Classes' },
	{ label: 'Zoey Back', name: 'zoey_back', time: '10', type: 'Classes' }
];

const buildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>
			Total Time: <strong>{props.totalPrice}</strong>
		</p>
		{controls.map((ctrl) => {
			if (ctrl.type === props.WorkoutType) {
				return (
					<BuildControl
						key={ctrl.label}
						label={ctrl.label}
						added={() => props.ingredientAdded(ctrl.name)}
						removed={() => props.ingredientRemoved(ctrl.name)}
						disabled={props.disableInfo[ctrl.type]}
						time={ctrl.time}
					/>
				);
			}
		})}

		<button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>
			Burn!
		</button>
	</div>
);

export default buildControls;
