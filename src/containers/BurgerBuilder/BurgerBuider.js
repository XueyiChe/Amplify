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
import * as actionType from '../../store/actions';

class BurgerBuider extends Component {
	state = {
		//purchaseable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	updatePurchase(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	purchaseHander = () => {
		this.setState({
			purchasing: true
		});
	};
	purchaseCancelHander = () => {
		this.setState({
			purchasing: false
		});
	};

	purchaseContinueHandler = () => {
		// const queryParams = [];
		// for (let i in this.props.ing) {
		// 	queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ing[i]));
		// }
		// queryParams.push('price=' + this.props.price);
		// const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout'
			// search: '?' + queryString
		});
	};
	componentDidMount() {
		// axios
		// 	.get('ingredients.json')
		// 	.then((response) => this.setState({ ingredient: response.data }))
		// 	.catch((error) => {
		// 		this.setState({
		// 			error: true
		// 		});
		// 	});
	}

	render() {
		const disableInfo = {
			...this.props.ing
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}

		console.log(disableInfo);
		let orderSummary = <Spinner />;

		if (!this.state.loading && this.props.ing) {
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ing}
					purchaseCancelled={this.purchaseCancelHander}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;

		if (this.props.ing) {
			burger = <Burger ingredient={this.props.ing} />;
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
					{orderSummary}
				</Modal>

				{burger}
				<BuildControl
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemoved={this.props.onIngredientRemoved}
					disableInfo={disableInfo}
					totalPrice={this.props.price}
					purchaseable={this.updatePurchase(this.props.ing)}
					ordered={this.purchaseHander}
				/>
			</Aux>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ing: state.ingredient,
		price: state.totalPrice
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuider, axios));
