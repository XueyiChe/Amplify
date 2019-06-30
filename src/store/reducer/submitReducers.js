import * as actionTypes from '../action/actions';

const initialState = {
	orders: [],
	loading: false,
	submitted: false,
	purchased: false
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SUBMIT_WORKOUT_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId
			};

			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
				submitted: true
			};

		case actionTypes.SUBMIT_WORKOUT_FAILED:
			return {
				...state,
				loading: false
			};
		case actionTypes.SUBMIT_WORKOUT_START:
			return {
				...state,
				submitted: false
			};

		case actionTypes.SUBMIT_WORKOUT_INIT:
			return {
				...state,
				submitted: false
			};

		case actionTypes.VIEW_HISTORY_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.VIEW_HISTORY_SUCCESS:
			return {
				...state,
				orders: action.orders,
				loading: false
			};
		case actionTypes.VIEW_HISTORY_FAILED:
			return {
				...state,
				loading: false
			};

		default:
			return state;
	}
};

export default reducer;
