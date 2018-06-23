import { h, Component } from 'preact';
import './style.css';

import projectData from './projects.json';

import Card from '../../Components/Card';
import Project from '../../Components/Project';

const colorsBright = {

	backgroundStart: '#519AF7',
	backgroundEnd: '#519AF7',
	textColor: 'white'
};

const colorsDark = {
	backgroundStart: '#ffffff',
	backgroundEnd: '#ffffff',
	textColor: 'black'
};

export default class CardsContainer extends Component {
	render() {
		return (
			<div className="cardsContainer">
				<Card
					title="Hello!"
					colors={colorsBright}
				>
					<p>
						{`I'm Daniel Smith, a software engineer with a background in Computer
            Science. I'm passionate about delivering a good user experience,
            optimization, and web development. I currently work at the Stennis
            Space Center for the Naval Research Laboratory. I love learning
            everything I can about computer science and the various technologies at my disposal, like ES6 and React.`}
					</p>

					<p>You can check out my resume at <a href="https://resume.danielsmith.io/" target="_blank" rel="noopener noreferrer">resume.danielsmith.io</a>. and see my Linkedin profile <a href="https://www.linkedin.com/in/danielsmith4483/" target="_blank" rel="noopener noreferrer">here</a>.</p>

					<h2>Strong points:</h2>
					<ul>
						<li>C++</li>
						<li>Python</li>
						<li>JavaScript</li>
						<li>React</li>
					</ul>

					<h2>Other technologies, stacks, languages:</h2>
					<ul>
						<li>Objective-C, Ruby, Java, C#</li>
						<li>Docker, various PaaS solutions</li>
						<li>MySQL</li>

					</ul>
				</Card>
				<Card title="My work" colors={colorsDark} ref={this.workRef}>
					<h2>Naval Research Laboratory</h2>
					<ul>
						<li>Frontend C++ development with Qt</li>
						<li>Backend microservices development with Java</li>
						<li>Scripting and tests in Python</li>
					</ul>

					<h2>The University of Southern Mississippi</h2>
					<ul>
						<li>iOS development with Objective-C</li>
						<li>Extensive work with Core Data, UITableViewControllers, and UISearchBar</li>
						<li>
              Implemented networking libraries for background content updates
              for mobile apps.
						</li>
						<li>Created a content management web app using AngularJS.</li>
						<li>Helped manage app testing practices using TestFlight.</li>
						<li>
              Participated in the delivery of apps to the iTunes App Store.
						</li>
					</ul>
				</Card>

				<Card title="My education" colors={colorsBright}>
					<h2>The University of Southern Mississippi (May 2013 - Aug. 2016)</h2>
					<ul>
						<li><strong>Master of Science</strong> in Computer Science</li>
						<li><strong>Bachelor of Science</strong> in Computer Science</li>
					</ul>

					<h2>Jones County Junior College (Aug. 2011 - May 2013)</h2>
					<ul>
						<li><strong>Associate of Applied Science</strong> in Information System Technology</li>
					</ul>
				</Card>

				<Card title="My projects" colors={colorsDark}>
					{projectData.map(p => <Project projectData={p} />)}
				</Card>

				<Card title="Contact" colors={colorsBright}>
					<p>Please contact me by email at daniel@danielsmith.io.</p>
				</Card>
			</div>
		);
	}
}
