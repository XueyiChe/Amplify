import React, { Component } from 'react';
import { connect } from 'react-redux';
import Workout from '../../components/Workout/WorkoutSport/Workout';
import WorkoutControl from '../../components/Workout/WorkoutControls/WorkoutControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Workout/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorHandler';
import * as actionType from '../../store/action/actions';
import WorkoutType from '../../components/WorkoutType/WorkoutType';

class WorkoutBuider extends Component {
	state = {
		//purchaseable: false,
		purchasing: false,
		loading: false,
		error: false,
		WorkoutType: 'Cardio'
	};

	updatePurchase(price) {
		return price > 30;
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		});
	};
	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		});
	};

	purchaseContinueHandler = () => {
		this.props.history.push({
			pathname: '/checkout'
			// search: '?' + queryString
		});
	};

	WorkoutTypeChangeHandler = (workout) => {
		this.setState({
			WorkoutType: workout
		});
	};

	historyHandler = () => {
		this.props.history.push({
			pathname: '/history'
			// search: '?' + queryString
		});
	};
	componentDidMount() {}

	render() {
		const disableInfo = {
			...this.props.ing
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}

		let orderSummary = <Spinner />;

		if (!this.state.loading && this.props.ing) {
			orderSummary = (
				<OrderSummary
					sports={this.props.ing}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		let workout = this.state.error ? <p>sports cannot be loaded!</p> : <Spinner />;

		if (this.props.ing) {
			workout = <Workout sport={this.props.ing} totalPrice={this.props.price} />;
		}
		let totalTime = null;
		if (Number.isInteger(this.props.price)) {
			totalTime = this.props.price + ':00';
			if (this.props.price < 10) {
				totalTime = '0' + this.props.price + ':00';
			}
		} else {
			totalTime = this.props.price.floor() + ':' + (this.props.price % 1).toFixed(2) * 60;
		}

		return (
			<div>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
					{orderSummary}
				</Modal>

				{workout}
				<WorkoutType ifchanged={this.WorkoutTypeChangeHandler} />
				<WorkoutControl
					WorkoutType={this.state.WorkoutType}
					sportAdded={this.props.onsportAdded}
					sportRemoved={this.props.onsportRemoved}
					disableInfo={disableInfo}
					totalPrice={totalTime}
					purchaseable={this.updatePurchase(this.props.price)}
					ordered={this.purchaseHandler}
					history={this.historyHandler}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ing: state.workout.sport,
		price: state.workout.totalPrice
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onsportAdded: (ingName) => dispatch({ type: actionType.ADD_sport, sportName: ingName }),
		onsportRemoved: (ingName) => dispatch({ type: actionType.REMOVE_sport, sportName: ingName })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(WorkoutBuider, axios));
