export const numberToTime = (time) => {
	let totalTime = null;
	if (Number.isInteger(time)) {
		totalTime = time + ':00';
		if (time < 10) {
			totalTime = '0' + time + ':00';
		}
	} else {
		totalTime = time.floor() + ':' + (time % 1).toFixed(2) * 60;
	}
	return totalTime;
};
