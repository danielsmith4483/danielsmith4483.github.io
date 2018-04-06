import { h, Component } from "preact";
import style from "./style";

import CardsContainer from "../../Containers/CardsContainer";
import LinksContainer from "../../Containers/LinksContainer";

import HeroImage from "../../Components/HeroImage";

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <div class={style.parallax}>
        </div>
        <div class={style.contents}>
          <CardsContainer />
          <LinksContainer />
        </div>
      </div>
    );
  }
}
