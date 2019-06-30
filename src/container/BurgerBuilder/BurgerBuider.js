import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/BurgerIngredient/Burger';
import BuildControl from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorHandler';
import * as actionType from '../../store/action/actions';
import Layout from '../../container/Layout/Layout';
import WorkoutType from '../../components/WorkoutType/WorkoutType';

class BurgerBuider extends Component {
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
					ingredients={this.props.ing}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;

		if (this.props.ing) {
			burger = <Burger ingredient={this.props.ing} totalPrice={this.props.price} />;
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
				<Layout>
					<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
						{orderSummary}
					</Modal>

					{burger}
					<WorkoutType ifchanged={this.WorkoutTypeChangeHandler} />
					<BuildControl
						WorkoutType={this.state.WorkoutType}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disableInfo={disableInfo}
						totalPrice={totalTime}
						purchaseable={this.updatePurchase(this.props.price)}
						ordered={this.purchaseHandler}
					/>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ing: state.workout.ingredient,
		price: state.workout.totalPrice
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuider, axios));
