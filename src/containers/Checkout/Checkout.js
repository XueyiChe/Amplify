import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends React.Component {
	// state = {
	// 	ingredient: null,
	// 	totalPrice: 0
	// };

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		if (param[0] === 'price') {
	// 			price = param[1];
	// 		} else {
	// 			ingredients[param[0]] = +param[1];
	// 		}
	// 	}

	// 	console.log(ingredients);
	// 	this.setState({
	// 		ingredient: ingredients,
	// 		totalPrice: price
	// 	});
	// }

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredient={this.props.ing}
					checkoutCancel={this.checkoutCancelHandler}
					checkoutContinue={this.checkoutContinueHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					// render={() => <ContactData ingredient={this.props.ing} price={this.props.price} {...this.props} />}
					component={ContactData}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ing: state.ingredient,
		price: state.totalPrice
	};
};

export default connect(mapStateToProps)(Checkout);
