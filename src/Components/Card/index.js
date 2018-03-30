import { h, Component } from "preact";
import "./style";

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="title">{this.props.title}</div>
        <div>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
