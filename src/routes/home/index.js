import { h, Component } from "preact";
import style from "./style";

import CardsContainer from "../../Containers/CardsContainer";
import LinksContainer from "../../Containers/LinksContainer";

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <CardsContainer />
        <LinksContainer />
      </div>
    );
  }
}
