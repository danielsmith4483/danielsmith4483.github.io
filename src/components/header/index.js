import { h, Component } from "preact";
import { Link } from "preact-router/match";
import style from "./style";

export default class Header extends Component {
  render() {
    return (
      <header class={style.header}>
        <h1>Daniel Smith</h1>
        <nav>
          <Link activeClassName={style.active} href="/">
            About Me
          </Link>
          <Link activeClassName={style.active} href="/#resume">
            Resume
          </Link>
          <Link activeClassName={style.active} href="/#projects">
            Projects
          </Link>
          <Link activeClassName={style.active} href="/#contact">
            Contact
          </Link>
        </nav>
      </header>
    );
  }
}
