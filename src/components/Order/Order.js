import React from 'react';
import classes from './Order.css';
const order = (props) => {
	const ingredient = [];
	for (let ingredientName in props.ingredient) {
		ingredient.push({
			name: ingredientName,
			amount: props.ingredient[ingredientName]
		});
	}

	const imgredientOutput = ingredient.map((ig) => {
		if (ig.amount !== 0) {
			const name = ig.name;
			const newName = name.replace('_', '-');
			return (
				<span
					style={{
						textTransform: 'capitalize',
						display: 'inline-block',
						margin: '0 8px',
						border: '1px solid #ccc',
						padding: '5px'
					}}
				>
					{newName} ({ig.amount})
				</span>
			);
		}
	});

	const date = new Date(props.date);
	const year = date.getFullYear();
	const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
	const month = months[date.getMonth()];
	const date1 = date.getDate();
	const submitDate = month + ' ' + date1 + ' ' + year;
	console.log(date);
	return (
		<div className={classes.Order}>
			<h5>Date: {submitDate}</h5>
			<p>Workout: {imgredientOutput}</p>
			<p>
				Total Time :<strong>{props.price}</strong>
			</p>
		</div>
	);
};

export default order;
