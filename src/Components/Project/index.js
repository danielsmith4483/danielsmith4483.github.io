import { h, Component } from "preact";
import "./style";

export default class Project extends Component {
  render() {
    return (
      <div className="project">
        <h2>{this.props.projectData.title}</h2>
        <p>{this.props.projectData.description}</p>
        <p>
          <a href={this.props.projectData.url} target="_blank">
            Website
          </a>
        </p>

        <p>
          <a href={this.props.projectData.repository} target="_blank">
            Repository
          </a>
        </p>
      </div>
    );
  }
}
