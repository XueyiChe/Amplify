import React from 'react';
import classes from './Timer.css';
import Button from '../UI/Button/Button';

class Timmer extends React.Component {
	state = {
		inputDisabled: false,
		input_time: 30,
		input_pause: 10,
		input_roundnumber: 10,
		currentRound: 0,
		counter: 30,
		start: false,
		pause: false,
		pauseTime: false
	};

	roundChangeHandler = (event) => {
		this.setState({
			input_time: event.target.value
		});
	};
	pauseChangeHandler = (event) => {
		this.setState({
			input_pause: event.target.value
		});
	};
	cycleChangeHandler = (event) => {
		this.setState({
			input_roundnumber: event.target.value
		});
	};

	start = () => {
		clearInterval(this.timmer);
		// disable input fields + start button
		this.setState({
			start: true,
			currentRound: 0
		});
		//this.secondReduceHandler();
		// for (let i = 0; i < this.state.input_roundnumber; i++) {
		this.startCycle();
		//}
	};

	pause = () => {
		this.setState({
			pause: true
		});
		clearInterval(this.timmer);
	};

	restart = () => {
		this.setState({
			pause: false
		});
		this.secondReduceHandler();
	};

	stop = () => {
		this.setState({
			start: false,
			pause: false
		});
		clearInterval(this.timmer);
		this.setState({
			currentRound: 0,
			counter: this.state.input_time
		});
	};
	startCycle = () => {
		this.setState((prevState) => {
			return {
				counter: this.state.input_time,
				currentRound: prevState.currentRound + 1
			};
		});
		if (this.state.currentRound < this.state.input_roundnumber + 1) {
			this.secondReduceHandler();
		}
	};

	//clearInterval(this.timmer)

	secondReduceHandler = () => {
		this.setState({
			pauseTime: false
		});
		this.timmer = setInterval(() => {
			if (this.state.counter > 0) {
				this.setState((prevState) => {
					return {
						counter: prevState.counter - 1
					};
				});
			} else {
				clearInterval(this.timmer);
				if (this.state.currentRound < this.state.input_roundnumber) {
					this.setState((prevState) => {
						return {
							counter: this.state.input_time
						};
					});
					this.startPause();
				}
			}
		}, 1000);
	};

	startPause = () => {
		this.setState({
			counter: this.state.input_pause,
			pauseTime: true
		});
		this.timmer = setInterval(() => {
			if (this.state.counter > 0) {
				this.setState((prevState) => {
					return {
						counter: prevState.counter - 1
					};
				});
			} else {
				clearInterval(this.timmer);
				if (this.state.currentRound < this.state.input_roundnumber) {
					this.setState((prevState) => {
						return {
							counter: this.state.input_time,
							currentRound: prevState.currentRound + 1
						};
					});
					this.secondReduceHandler();
				}
			}
		}, 1000);
	};

	updateRoundHandler = () => {
		const time = this.state.input_time * 100;
		this.updateRound = setTimeout(() => {
			this.setState((prevState) => {
				return { currentRound: prevState.currentRound + 1 };
			});
		}, time);
	};

	// startCycle = () => {
	// 	let cyclesCounter = this.state.currentRound;
	// 	cyclesCounter = cyclesCounter + 1;
	// 	this.setState((currentRound = cyclesCounter));
	// 	// start 1sec timer
	// 	timer = setInterval(function() {
	// 		// start round
	// 		countDownRound();

	// 		if (roundLength < -1) {
	// 			// start pause
	// 			if (pauseLength == getByID('input_pause').value) {
	// 				playSound(2);
	// 			}
	// 			countDownPause();
	// 			if (pauseLength < 0) {
	// 				clearInterval(timer);
	// 				playSound(1);
	// 				roundLength = getByID('input_time').value;
	// 				pauseLength = getByID('input_pause').value;
	// 				if (cyclesCounter > 0) {
	// 					startCycle();
	// 				}
	// 			}
	// 		}
	// 	}, 1000);
	// };

	// stop = () => {
	// 	//clearInterval(timer);
	// 	this.setState({
	// 		inputDisabled: false
	// 	});
	// };

	// /* --------- Timer helper --------- */

	// countDownRound=()=>{
	// 	counter.replaceData(0,counter.nodeValue.length,roundLength);
	// 	roundLength--;
	// }

	// countDownPause=()=> {
	// 	counter.replaceData(0,counter.nodeValue.length,pauseLength);
	// 	pauseLength--;
	// }

	// inputDisabled=()=> {
	// 	getByID("input_time").disabled = status;
	// 	getByID("input_pause").disabled = status;
	// 	getByID("input_roundnumber").disabled = status;
	// 	getByClass("controller__button-start").disabled = status;
	// }

	// function updateRoundCounter() {
	// 	roundCounter.replaceData(0,roundCounter.nodeValue.length,"0/"+getByID("input_roundnumber").value);
	// }

	render() {
		let displayCounter = this.state.counter;
		if (this.state.counter < 10) {
			displayCounter = '0' + this.state.counter;
		}
		let divCounter = <div className={classes.clock__counter}>{displayCounter}</div>;
		if (this.state.pauseTime) {
			divCounter = <div className={classes.clock__pause_counter}>{displayCounter}</div>;
		}

		let roundCounter = this.state.currentRound + '/' + this.state.input_roundnumber;
		let buttons = null;
		if (!this.state.start) {
			buttons = (
				<div>
					<Button btnType="Danger" disabled clicked={this.stop}>
						Pause
					</Button>
					<Button btnType="Success" clicked={this.start}>
						Start
					</Button>
				</div>
			);
		}

		if (this.state.start && !this.state.pause) {
			buttons = (
				<div>
					<Button btnType="Success" disabled clicked={this.pause}>
						Pause
					</Button>
					<Button btnType="Danger" clicked={this.stop}>
						Stop
					</Button>
				</div>
			);
		}

		if (this.state.start && this.state.pause) {
			buttons = (
				<div>
					<Button btnType="Success" disabled clicked={this.restart}>
						Restart
					</Button>
					<Button btnType="Danger" clicked={this.stop}>
						Stop
					</Button>
				</div>
			);
		}
		return (
			<div className={classes.clock}>
				<div className={classes.row}>
					<div className={classes.g_100}>
						<h1 className={classes.clock__title}>Timer</h1>
						{divCounter}
						<div className={classes.clock__round_counter}>{roundCounter}</div>
					</div>
				</div>

				<div className={classes.row}>
					<div className={classes.inputtime}>
						<span className={classes.inputword}>Round </span>
						<input
							className={classes.inputs}
							disabled={this.state.inputDisabled}
							type="text"
							onChange={this.roundChangeHandler}
							value={this.state.input_time}
						/>
					</div>

					<div className={classes.inputtime}>
						<span className={classes.inputword}>Pause </span>
						<input
							className={classes.inputs}
							disabled={this.state.inputDisabled}
							type="text"
							onChange={this.pauseChangeHandler}
							value={this.state.input_pause}
						/>
					</div>

					<div className={classes.inputtime}>
						<span className={classes.inputword}>Number</span>
						<input
							className={classes.inputs}
							disabled={this.state.inputDisabled}
							type="text"
							onChange={this.cycleChangeHandler}
							value={this.state.input_roundnumber}
						/>
					</div>
					{buttons}
				</div>
			</div>
		);
	}
}

export default Timmer;
