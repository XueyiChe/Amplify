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
						<div className={classes.folders}>
							<OneCard
								link="https://secondinning.online"
								name="Second Inning"
								left="60px"
								image="asset/secondinning.JPG"
							/>
						</div>
						<div className={classes.folders}>
							<OneCard link="/gym" name="Gym Recorder" left="40px" image="asset/gymapp.JPG" />
						</div>
						<div className={classes.folders}>
							<OneCard link="/visulisation" name="Data Visualisation" left="40px" image="asset/viz.JPG" />
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
