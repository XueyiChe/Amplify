import React from 'react';
import * as d3 from 'd3-3';
import OneCard from './card/onecard';
import classes from './production.css';
import Jumbotron from '../Home/Jumbotron';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Layout from '../../container/Layout/Layout';
export default class Production extends React.Component {
	render() {
		return (
			<Layout>
				<div className={classes.productions}>
					<div className={classes.displayflex}>
						<OneCard
							link="https://secondinning.online"
							name="Second Inning"
							left="220px"
							image="asset/secondinning.jpg"
						/>
						<OneCard link="/gym" name="Gym Recorder" left="220px" image="asset/gymapp.jpg" />
						<OneCard link="" name="Data Visualisation" left="200px" image="asset/viz.jpg" />
						<OneCard link="/timer" name="Workout Timer" left="220px" image="asset/timer.jpg" />
					</div>
				</div>
			</Layout>
		);
	}
}
