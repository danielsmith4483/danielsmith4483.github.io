import React, { Component } from "react";
import "./App.css";

import iconGithub from "./Icons/github.svg";
import iconLinkedin from "./Icons/linkedin.svg";
import iconInstagram from "./Icons/instagram.svg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Daniel Smith</h1>
        </header>
        <p className="App-intro">
          <img
            src={iconGithub}
            className="App-social-icon"
            alt="Github social icon"
          />
          <img
            src={iconLinkedin}
            className="App-social-icon"
            alt="Linkedin social icon"
          />
          <img
            src={iconInstagram}
            className="App-social-icon"
            alt="Instagram social icon"
          />
        </p>
        <p>Software Engineer with a background in Computer Science.</p>
      </div>
    );
  }
}

export default App;
