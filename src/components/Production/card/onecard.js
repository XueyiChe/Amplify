import React from 'react';
import classes from './onecard.css';
import { Link } from 'react-router-dom';

const onecard = (props) => {
	const style = {
		position: 'absolute',
		top: '100px',
		left: props.left,
		zIndex: '100'
	};
	return (
		<a href={props.link}>
			<div className={classes.container}>
				<div className={classes.folder}>
					<div className={classes.project} style={style}>
						<h2>{props.name}</h2>
					</div>
					<div className={classes.folder_inside}>
						<img src={props.image} width="320px" height="200px" />
					</div>
				</div>
			</div>
		</a>
	);
};

export default onecard;
