import { h, Component } from "preact";
import "./style";

export default class Card extends Component {
  render() {
    let style = {};
    if (this.props.colors) {
      style = {
        backgroundImage:
          `linear-gradient(150deg, ` +
          `${this.props.colors.backgroundStart} 0%, ` +
          `${this.props.colors.backgroundEnd} 100%)`,
        color: this.props.colors.textColor
      };
    }

    return (
      <div className="card" style={style}>
        <div className="title">{this.props.title}</div>
        <div>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
