import { h, Component } from "preact";
import "./style.css";

import cardData from "./cards.json";
import projectData from "./projects.json";

import Card from "../../Components/Card";
import Project from "../../Components/Project";

const colorsBright = {

  backgroundStart: "#519AF7",
  backgroundEnd: "#519AF7",
  textColor: "white"
};

const colorsDark = {
  backgroundStart: "#ffffff",
  backgroundEnd: "#ffffff",
  textColor: "black"
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
            {`I'm Daniel, a software engineer with a background in Computer
            Science. I'm passionate about delivering a good user experience,
            optimization, and weightlifting. I currently work at the Stennis
            Space Center for the Naval Research Laboratory. I love learning
            everything I can about computer science and the various technologies at my disposal, like ES6 and React.`}
          </p>

          <h2>Strong points:</h2>
          <ul>
            <li>C++ (particularly with Qt)</li>
            <li>ES6+</li>
            <li>React</li>
          </ul>

          <h2>Other technologies, stacks, languages:</h2>
          <ul>
            <li>Python, Ruby, Java, C#</li>
            <li>Docker, various PaaS solutions</li>
            <li>MySQL</li>

          </ul>
        </Card>
        <Card title="My work" colors={colorsDark}>
          <h2>Naval Research Laboratory</h2>
          <ul>
            <li>Developing client applications using Qt C++.</li>
            <li>Implementing Java-based microservices to support said applications.</li>
            <li>Participating in daily scrum activites including backlog grooming, sprint planning, and daily standups.</li>
          </ul>

          <h2>The University of Southern Mississippi</h2>
          <ul>
            <li>
              Designed and developed a content delivery framework for university
              department apps using Objective-C.
            </li>
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
          {projectData.map(p => {
            return <Project projectData={p} />;
          })}
        </Card>

        <Card title="Contact" colors={colorsBright} />
      </div>
    );
  }
}
