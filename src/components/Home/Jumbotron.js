import React from 'react';
import { Jumbotron, Image } from 'react-bootstrap';
import classes from './Jumbotron.css';

const jumbotron = () => {
	const fontSizeBig = {
		fontSize: '40px'
	};
	return (
		<Jumbotron className={classes.jumbotron}>
			<h1> Hello! I'm Xueyi Che</h1>
			<Image id={classes.web_developer} src="asset/web_developer.png" width="20%" height="20%" />
			{/* <Image id = 'federer' src = 'asset/roger-federer.png'></Image>
           <Image id = 'curry' src = 'asset/Curry.png'></Image>
           <Image id = 'history' src = 'asset/history.png'></Image>
           <Image id = 'Ningbo' src = 'asset/Ningbo.png'></Image>
           <Image id = 'gym' src = 'asset/gym.png'></Image> */}
			<Image id={classes.feminism} src="asset/feminism.png" width="150px" />
			<div id={classes.girls}>
				<h2 style={fontSizeBig}> GIRLS </h2>
				<h2> CAN DO </h2>
				<h2> ANYTHING </h2>
			</div>

			<p>A Web Developer and Programmer</p>
		</Jumbotron>
	);
};

export default jumbotron;
