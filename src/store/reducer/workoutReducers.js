import * as actionType from '../action/actions';

const initialState = {
	ingredient: {
		row: 0,
		elliptical: 0,
		cycling: 0,
		hip_leg: 0,
		arm: 0,
		back_breast: 0,
		swam_arm: 0,
		swam_leg: 0,
		zoey_ab: 0,
		zoey_back: 0
	},
	totalPrice: 0
};

const INGREDENT_PRICES = {
	row: 5,
	elliptical: 10,
	cycling: 10,
	hip_leg: 3,
	arm: 3,
	back_breast: 3,
	swam_arm: 15,
	swam_leg: 18,
	zoey_ab: 12,
	zoey_back: 10
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.ADD_INGREDIENT:
			return {
				...state,
				ingredient: {
					...state.ingredient,
					[action.ingredientName]:
						state.ingredient[action.ingredientName] + INGREDENT_PRICES[action.ingredientName]
				},
				totalPrice: state.totalPrice + INGREDENT_PRICES[action.ingredientName]
			};
		case actionType.REMOVE_INGREDIENT:
			return {
				...state,
				ingredient: {
					...state.ingredient,
					[action.ingredientName]:
						state.ingredient[action.ingredientName] - INGREDENT_PRICES[action.ingredientName]
				},
				totalPrice: state.totalPrice - INGREDENT_PRICES[action.ingredientName]
			};
		default:
			return state;
	}
};
export default reducer;
