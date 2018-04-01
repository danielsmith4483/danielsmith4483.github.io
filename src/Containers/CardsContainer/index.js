import { h, Component } from "preact";

import cardData from "./cards.json";

import Card from "../../Components/Card";

const colorsBright = {
  backgroundStart: "#F9FEA5",
  backgroundEnd: "#20E2D7",
  textColor: "black"
};

const colorsDark = {
  backgroundStart: "#181921",
  backgroundEnd: "#181921",
  textColor: "white"
};

export default class CardsContainer extends Component {
  render() {
    return (
      <div>
        <Card
          title="Bio"
          colors={colorsBright}
          imageRight="https://i.imgur.com/Jsy1Zyw.jpg"
        >
          <p>
            Software Engineer with a background in Computer Science. Passionate
            about JavaScript, React, and weightlifting/fitness. Currently
            working at the Naval Research Laboratory.
          </p>
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
