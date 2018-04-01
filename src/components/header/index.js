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
            Bio
          </Link>
          <Link activeClassName={style.active} href="/#work-experience">
            Work Experience
          </Link>
          <Link activeClassName={style.active} href="/#education">
            Education
          </Link>
          <Link activeClassName={style.active} href="/#projects">
            Projects
          </Link>
          <Link activeClassName={style.active} href="/#contacts">
            Contacts
          </Link>
        </nav>
      </header>
    );
  }
}
