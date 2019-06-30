import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class layout extends React.Component {
	state = {
		showSideDrawer: false
	};
	SideDrawerCloseHandler = () => {
		this.setState({
			showSideDrawer: false
		});
	};

	SideDrawerToggleHandler = () => {
		this.setState((prevState) => {
			return { showSideDrawer: true };
		});
	};

	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.SideDrawerToggleHandler} />
				<SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler} />
				<main className={classes.Content}>{this.props.children}</main>
			</Aux>
		);
	}
}

export default layout;
