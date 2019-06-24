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
		return (
			<span
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #ccc',
					padding: '5px'
				}}
				key={ig.name}
			>
				{ig.name} ({ig.amount})
			</span>
		);
	});
	return (
		<div className={classes.Order}>
			<p>Ingredients: {imgredientOutput}</p>
			<p>
				Price :<strong>{props.price}</strong>
			</p>
		</div>
	);
};

export default order;
