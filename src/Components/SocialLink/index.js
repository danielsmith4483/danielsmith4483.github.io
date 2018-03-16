import React, { Component } from "react";
import "./index.css";

import "font-awesome/css/font-awesome.min.css";

class SocialLink extends Component {
  render() {
    return (
      <span>
        <a className="social-link" href={this.props.url} target="_blank">
          <i className={`fa fa-2x fa-${this.props.icon}`} />
        </a>
      </span>
    );
  }
}

export default SocialLink;
