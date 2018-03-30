import { h, Component } from "preact";

import cardData from "./cards.json";

import Card from "../../Components/Card";

export default class CardsContainer extends Component {
  render() {
    return (
      <div>
        {cardData.map(c => {
          return <Card title={c.title}>{c.contents}</Card>;
        })}
      </div>
    );
  }
}
