import React from 'react';
import Burger from '../../Burger/BurgerIngredient/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
	return (
		<div className={classes.checkoutSummary}>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredient={props.ingredient} />
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
