import * as actionType from './actions';

const initialState = {
	sport: {
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
		case actionType.ADD_sport:
			return {
				...state,
				sport: {
					...state.sport,
					[action.sportName]: state.sport[action.sportName] + 1
				},
				totalPrice: state.totalPrice + INGREDENT_PRICES[action.sportName]
			};
		case actionType.REMOVE_sport:
			return {
				...state,
				sport: {
					...state.sport,
					[action.sportName]: state.sport[action.sportName] - 1
				},
				totalPrice: state.totalPrice - INGREDENT_PRICES[action.sportName]
			};
		default:
			return state;
	}
};
export default reducer;
