import * as actionTypes from '../action/actions';
import axios from '../../axios-orders';

export const submitSuccess = (id, orderData) => {
	return {
		type: actionTypes.SUBMIT_WORKOUT_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const submitFail = (error) => {
	return {
		type: actionTypes.SUBMIT_WORKOUT_FAILED,
		error: error
	};
};

export const submitStart = () => {
	return {
		type: actionTypes.SUBMIT_WORKOUT_START
	};
};

export const updatelastWorkout = (orderData) => {
	return (dispatch) => {
		dispatch(submitStart());
		axios.post('/lastworkout.json', orderData).then((response) => {}).catch((error) => {});
	};
};

export const submitWorkout = (orderData) => {
	updatelastWorkout(orderData);
	return (dispatch) => {
		dispatch(submitStart());
		axios
			.post('/workout.json', orderData)
			.then((response) => {
				dispatch(submitSuccess(response.data.date, orderData));
			})
			.catch((error) => {
				dispatch(submitFail(error));
			});
	};
};

export const submitInit = () => {
	return {
		type: actionTypes.SUBMIT_WORKOUT_INIT
	};
};

export const viewHistorySuccess = (orders) => {
	return {
		type: actionTypes.VIEW_HISTORY_SUCCESS,
		orders: orders
	};
};
export const viewHistoryFailed = (error) => {
	return {
		type: actionTypes.VIEW_HISTORY_FAILED,
		error: error
	};
};
export const viewHistoryStart = () => {
	return {
		type: actionTypes.VIEW_HISTORY_START
	};
};

export const viewHistory = () => {
	return (dispatch) => {
		dispatch(viewHistoryStart());
		axios
			.get('/workout.json')
			.then((response) => {
				const fetchedOrders = response.data;
				let orders = [];
				for (let key in fetchedOrders) {
					orders.push({
						id: key,
						...fetchedOrders[key]
					});
				}
				dispatch(viewHistorySuccess(orders));
			})
			.catch((error) => {
				dispatch(viewHistoryFailed(error));
			});
	};
};
