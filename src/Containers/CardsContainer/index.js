import { h, Component } from "preact";
import "./style.css";

import cardData from "./cards.json";
import projectData from "./projects.json";

import Card from "../../Components/Card";
import Project from "../../Components/Project";

const colorsBright = {
  backgroundStart: "#4c5ad6",
  backgroundEnd: "#4350cb",
  textColor: "white"
};

const colorsDark = {
  backgroundStart: "#cfd9df",
  backgroundEnd: "#e2ebf0",
  textColor: "black"
};

export default class CardsContainer extends Component {
  render() {
    return (
      <div className="cardsContainer">
        <Card
          title="Hello!"
          colors={colorsBright}
          imageRight="https://i.imgur.com/Jsy1Zyw.jpg"
        >
          <p>
            {`I'm Daniel, a software engineer with a background in Computer
            Science. I'm passionate about delivering a good user experience,
            optimization, and weightlifting. I currently work at the Stennis
            Space Center for the Naval Research Laboratory. I love learning
            everything I can about ES6 & React, and I dabble in making chat bots and
            other one-off projects.`}
          </p>
        </Card>
        <Card title="My work" colors={colorsDark}>
          <h2>Naval Research Laboratory</h2>
          <p>
            <ul>
              <li>todo</li>
            </ul>
          </p>

          <h2>The University of Southern Mississippi</h2>
          <p>
            <ul>
              <li>
                Designed and developed a content delivery framework for
                university department apps using Objective-C.
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
          </p>
        </Card>

        <Card title="My education" colors={colorsBright}>
          <h2>The University of Southern Mississippi (May 2013 - Aug. 2016)</h2>
          <ul>
            <li>Master of Science in Computer Science</li>
            <li>Bachelor of Science in Computer Science</li>
          </ul>

          <h2>Jones County Junior College (Aug. 2011 - May 2013)</h2>
          <ul>
            <li>Master of Science in Computer Science</li>
            <li>Bachelor of Science in Computer Science</li>
          </ul>
        </Card>

        <Card title="My projects" colors={colorsDark}>
          {projectData.map(p => {
            return <Project projectData={p} />;
          })}
        </Card>
        {cardData.map(c => {
          return (
            <Card title={c.title} colors={c.colors}>
              {c.contents}
            </Card>
          );
        })}
      </div>
    );
  }
}
