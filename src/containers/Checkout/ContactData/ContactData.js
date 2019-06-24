import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

class ContactData extends React.Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({
			loading: true
		});
		const order = {
			ingredient: this.props.ing,
			totalPrice: this.props.price,
			address: {
				state: 'VIC',
				street: '10 Westminster St',
				postcode: '3166'
			},
			customer: {
				name: 'Xueyi',
				phone: '13185910076'
			},
			delivery: 'Fastest'
		};
		axios
			.post('/order.json', order)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch((error) => this.setState({ loading: false }));
	};

	render() {
		let form = (
			<form>
				<input type="text" name="name" className={classes.input} placeholder="Your name" />
				<input type="email" name="email" className={classes.input} placeholder="Your E-mail" />
				<input type="text" name="street" className={classes.input} placeholder="Your Street" />
				<input type="text" name="postal" className={classes.input} placeholder="Your postcode" />
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
				<Button btnType="Success" clicked={this.orderHandler}>
					Order
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ing: state.ingredient,
		price: state.totalPrice
	};
};

export default connect(mapStateToProps)(ContactData);
