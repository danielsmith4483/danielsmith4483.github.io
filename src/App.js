import React, { Component } from "react";
import "./App.css";

import SocialLink from "./Components/SocialLink";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Daniel Smith</h1>
        </header>
        <p className="App-intro">
          <SocialLink
            icon="github-alt"
            url="https://github.com/danielsmith4483"
          />
          <SocialLink
            icon="linkedin"
            url="https://www.linkedin.com/in/danielsmith4483/"
          />
          <SocialLink
            icon="instagram"
            url="https://www.instagram.com/danielsmith4483/"
          />
        </p>

        <p>
          Software Engineer with a background in Computer Science. Passionate
          about JavaScript, React, and weightlifting/fitness. Currently working
          at the Naval Research Laboratory.
        </p>

        <h2>Education</h2>

        <h2>Work Experience</h2>

        <h2>Projects</h2>

        <h2>Contact</h2>
      </div>
    );
  }
}

export default App;
