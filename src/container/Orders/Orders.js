import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorHandler';
import { connect } from 'react-redux';
import * as ActionCreator from '../../store/action/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
	state = {
		order: [],
		loading: true
	};
	componentDidMount() {
		this.props.viewHistory();
	}
	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map((i) => (
				<Order key={i.date} date={i.date} ingredient={i.ingredient} price={i.price} />
			));
			console.log(this.props.orders);
		}
		return <div>{orders} </div>;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.submit.orders,
		loading: state.submit.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		viewHistory: () => dispatch(ActionCreator.viewHistory())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
