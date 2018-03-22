import { h, Component } from "preact";
import style from "./style";

export default class Home extends Component {
  render() {
    return (
      <div class={style.home}>
        <p class={style.card}>
          Hello! I'm a software engineer with a background in Computer Science.
          I currently work at the Naval Research Laboratory. I love Node, React,
          Electron, and weightlifting.
        </p>

        <p class={style.card}>Resume</p>

        <p class={style.card}>Projects</p>
      </div>
    );
  }
}
