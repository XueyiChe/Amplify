import * as actionType from './actions';

const initialState = {
	ingredient: {
		meat: 0,
		salad: 0,
		bacon: 0,
		cheese: 0
	},
	totalPrice: 4
};

const INGREDENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.ADD_INGREDIENT:
			return {
				...state,
				ingredient: {
					...state.ingredient,
					[action.ingredientName]: state.ingredient[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDENT_PRICES[action.ingredientName]
			};
		case actionType.REMOVE_INGREDIENT:
			return {
				...state,
				ingredient: {
					...state.ingredient,
					[action.ingredientName]: state.ingredient[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDENT_PRICES[action.ingredientName]
			};
		default:
			return state;
	}
};
export default reducer;
