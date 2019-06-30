import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorHandler';
import { connect } from 'react-redux';
import * as ActionCreator from '../../store/action/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './Orders.css';
import Button from '../../components/UI/Button/Button';
import { withRouter } from 'react-router-dom';

class Orders extends React.Component {
	componentDidMount() {
		this.props.viewHistory();
	}

	backtoHomepage = () => {
		this.props.history.push({
			pathname: '/gym'
			// search: '?' + queryString
		});
	};
	render() {
		console.log(this.props);
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map((i) => (
				<Order key={i.date} date={i.date} ingredient={i.ingredient} price={i.price} />
			));
			console.log(this.props.orders);
		}
		return (
			<div className={styles.Orders}>
				{orders}
				<div className={styles.center}>
					<Button btnType="Success" clicked={this.backtoHomepage}>
						Back
					</Button>
				</div>
			</div>
		);
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
