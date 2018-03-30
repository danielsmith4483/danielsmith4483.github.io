import { h, Component } from "preact";
import "./style";

export default class SocialLink extends Component {
  render() {
    return (
      <span className="socialLink">
        <a href={this.props.url} target="_blank">
          {this.props.title}
        </a>
      </span>
    );
  }
}
