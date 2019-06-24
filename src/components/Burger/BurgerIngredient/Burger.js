import React from 'react';
import BurgerIngredient from './BurgerIngredient';
import classes from './Burger.css';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
	let tranIngredient = Object.keys(props.ingredient)
		.map((igKey) => {
			return [ ...Array(props.ingredient[igKey]) ].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (tranIngredient.length === 0) {
		tranIngredient = <p>Please add</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{tranIngredient}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default withRouter(burger);
