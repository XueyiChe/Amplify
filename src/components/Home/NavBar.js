import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';

const Navigationbar = () => {
	return (
		<Navbar expand="lg">
			{/* <Navbar.Brand href="#home">
                   <Image src = 'asset/photo_round.jpg' roundedCircle   width = '50px' height = '50px'/> 
                </Navbar.Brand> */}
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse className="justify-content-end">
				<Nav>
					<Nav.Link href="#home">Home</Nav.Link>
					<Nav.Link href="#link">Education</Nav.Link>
					<Nav.Link href="#link">Work</Nav.Link>
					<Nav.Link href="/portfolios">Portfolios</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Navigationbar;
