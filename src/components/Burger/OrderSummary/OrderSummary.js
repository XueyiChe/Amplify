import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
import { numberToTime } from '../../../utility/utility';

class OrderSummary extends React.Component {
	componentWillUpdate() {
		console.log('[OrderSummarUpdate');
	}
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
			if (this.props.ingredients[igKey] !== 0) {
				return (
					<li key={igKey}>
						<span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
						{numberToTime(this.props.ingredients[igKey])}
					</li>
				);
			}
		});

		const time = numberToTime(this.props.price);
		return (
			<Aux>
				<h3>Your workout</h3>
				<p>Today's workout include:</p>
				<ul>{ingredientSummary}</ul>
				<p>Total time: {time}</p>
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
