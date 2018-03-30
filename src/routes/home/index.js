import { h, Component } from "preact";
import style from "./style";

import CardsContainer from "../../Containers/CardsContainer";

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <CardsContainer />
      </div>
    );
  }
}
