import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
	componentWillUpdate() {
		console.log('[OrderSummarUpdate');
	}
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
				</li>
			);
		});
		return (
			<Aux>
				<h3>Your order</h3>
				<p>A deliciou burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>Total Price: {this.props.price.toFixed(2)}</p>
				<p>Continue to checkout</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>
					Cancel
				</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>
					Continue
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
