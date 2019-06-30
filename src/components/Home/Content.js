import React from 'react';
import { Image } from 'react-bootstrap';
import classes from './Home.css';
const introduction = () => {
	const marginLeft = {
		marginLeft: '20px'
	};
	return (
		<div className={classes.content}>
			<div className={[ classes.period, classes.whoamI ].join()}>
				<div className={classes.displayflex}>
					<i className="fas fa-female fa-3x" />
					<h2 style={marginLeft}>Who Am I?</h2>
				</div>
				<div className={classes.displayflex}>
					<Image src="/asset/photo_round.jpg" roundedCircle width="200px" height="200px" />
					<div className={[ classes.textLeft, classes.introductionWords ].join()}>
						<p>I'm Xueyi Che from China. </p>
						<p>A web developer and programmer</p>
						<p>graduate from Monash University.</p>
						<p>Seeking for a job in Australia.</p>
					</div>
				</div>
			</div>
			<div className={[ classes.period, classes.skills ].join()}>
				<div className={classes.displayflex}>
					<i class="fas fa-file-code fa-2x" />
					<h2 style={marginLeft}>What I Can Do?</h2>
				</div>
				<div className={classes.displayflex}>
					<div className={[ classes.textLeft, classes.programmerSkills ].join()}>
						<span className={classes.spandisplayflex}>
							<i class="fab fa-html5 fa-1x" /> &nbsp;
							<p>html,css,javascript, ReactJS, AngularJS, Ajax, Wordpress </p>
						</span>
						<span className={classes.spandisplayflex}>
							<i class="fab fa-java fa-1x" /> &nbsp;
							<p>JAVA, Servlets, Socket</p>
						</span>

						<span className={classes.spandisplayflex}>
							<i class="fas fa-mobile fa-1x" /> &nbsp;
							<p>IOS Development, Android Development</p>
						</span>

						<span className={classes.spandisplayflex}>
							<i class="fab fa-python fa-1x" /> &nbsp;
							<p>Python Programming</p>
						</span>
					</div>
					<Image src="/asset/Programming_languages2.jpg" roundedCircle width="200px" height="200px" />
				</div>
			</div>
			<div className={[ classes.period, classes.education ].join()}>
				<div className={classes.displayflex}>
					<i class="fas fa-university fa-2x" />
					<h2 style={marginLeft}>My Education Background</h2>
				</div>

				<div className={classes.Nottingham}>
					<div className={classes.displayflex}>
						<Image src="/asset/nottingham-university-logo.png" width="200px" height="200px" />
						<div className={[ classes.textLeft, classes.NottinghamExperiece ].join()}>
							<p>
								<b>2012-2016 The University of Nottingham, Ningbo, China</b>
							</p>
							<p>BSc Environmental Sciences, School of Geographical Sciences</p>
							<p>Grade: Second class, Division one</p>
							<p>Learned: Geographical Sciences, GIS, Ecology</p>
						</div>
					</div>
				</div>
				<br />
				<div className={classes.Monash}>
					<div className={classes.displayflex}>
						<Image src="/asset/monash-university-logo-transparent.png" width="200px" height="200px" />
						<div className={[ classes.textLeft, classes.MonashExperiece ].join()}>
							<p>
								<b>2017-Current Monash University</b>
							</p>
							<p>Master of information technology</p>
							<p>Grade: 71% in first three semester</p>
							<p>Learned: Software Engineering, Algorithm and Data Structure</p>
							<p>Intelligence System, Product Management</p>
						</div>
					</div>
				</div>
			</div>

			<div className={[ classes.period, classes.work ].join()}>
				<div className={classes.displayflex}>
					<i class="fas fa-briefcase fa-2x" />
					<h2 style={marginLeft}>My Work Experience</h2>
				</div>
				<div className={classes.displayflex}>
					<div className={[ classes.textLeft, classes.HRW ].join()}>
						<p>
							<b>2016.6-2017.1 HR Wallingford, Shanghai</b>
						</p>
						<p>World-leading analysis, advice and support in engineering </p>
						<p>and environmental hydraulics, and in the management of </p>
						<p>water and the water environment.</p>
						<p>Internship</p>
						<p>Role:Technical Support for Hydraulic Modeling</p>
						<p> Customer Service for Software </p>
					</div>
					<Image src="/asset/hr.png" width="180px" height="180px" />
				</div>
			</div>
		</div>
	);
};
export default introduction;
