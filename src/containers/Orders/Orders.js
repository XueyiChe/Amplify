import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorHandler';
class Orders extends React.Component {
	state = {
		order: [],
		loading: true
	};
	componentDidMount() {
		axios
			.get('/order.json')
			.then((response) => {
				const fetchedOrders = response.data;
				let orders = [];
				for (let key in fetchedOrders) {
					orders.push({
						id: key,
						...fetchedOrders[key]
					});
				}

				this.setState({
					order: orders,
					loading: false
				});
				console.log(this.state.order);
			})
			.catch((error) => {
				this.setState({
					error: false
				});
			});
	}
	render() {
		const orders = this.state.order.map((i) => <Order key={i.id} ingredient={i.ingredient} price={i.totalPrice} />);
		return (
			<div>
				{this.state.order.map((i) => <Order key={i.id} ingredient={i.ingredient} price={i.totalPrice} />)}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
