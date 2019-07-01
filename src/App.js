import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Production from './components/Production/Production';
import Viz from './components/Production/viz/viz';
import GymBuider from './container/WorkoutBuilder/WorkoutBuider';
import Checkout from './container/Checkout/Checkout';
import History from './container/Orders/Orders';
import Layout from './container/Layout/Layout';
import Timer from './components/Timer/Timer';
function App() {
	return (
		<div>
			<Layout>
				<Switch>
					<Route path="/portfolios" component={Production} />
					<Route path="/visulisation" component={Viz} />
					<Route path="/gym" component={GymBuider} />
					<Route path="/checkout" component={Checkout} />
					<Route path="/history" component={History} />
					<Route path="/timer" component={Timer} />
					<Route exact path="/" component={Home} />
				</Switch>
			</Layout>
		</div>
	);
}

export default App;
