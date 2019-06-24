import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuider from './containers/BurgerBuilder/BurgerBuider';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Timer from './components/Timer/Timer';
class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/orders" exact component={Orders} />
						{/* <Route path="/orders" component={Order} /> */}
						<Route path="/timer" component={Timer} />
						<Route path="/checkout" component={Checkout} />
						<Route path="/" exact component={BurgerBuider} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
