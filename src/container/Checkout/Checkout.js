import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as ActionCreater from '../../store/action/';

class Checkout extends React.Component {
	checkoutCancelHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinueHandler = () => {
		const date = new Date();
		// this.props.history.replace('/checkout/contact-data');
		const formData = {
			sport: this.props.ing,
			price: this.props.price,
			date: date
		};
		this.props.submitWorkout(formData);
	};

	// componentWillMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const sports = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		if (param[0] === 'price') {
	// 			price = param[1];
	// 		} else {
	// 			sports[param[0]] = +param[1];
	// 		}
	// 	}

	// 	console.log(sports);
	// 	this.setState({
	// 		sport: sports,
	// 		totalPrice: price
	// 	});
	// }

	render() {
		let summary = <Redirect to="/gym" />;
		if (this.props.ing) {
			const submitRedirect = this.props.submitted ? <Redirect to="/gym" /> : null;
			summary = (
				<div>
					{submitRedirect}
					<CheckoutSummary
						sport={this.props.ing}
						checkoutCancel={this.checkoutCancelHandler}
						checkoutContinue={this.checkoutContinueHandler}
					/>
				</div>
			);
		}
		return (
			<div>
				{summary}
				{/* <Route
					path={this.props.match.path + '/contact-data'}
					// render={() => <ContactData sport={this.props.ing} price={this.props.price} {...this.props} />}
					component={ContactData}
				/> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ing: state.workout.sport,
		price: state.workout.totalPrice,
		submitted: state.submit.submitted,
		loading: state.submit.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		submitWorkout: (workout) => dispatch(ActionCreater.submitWorkout(workout))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
