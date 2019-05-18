import React, { Component } from "react";
import World from "./Components/World/World";
import Rules from "./Components/Rules/Rules";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faHome, faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus, faHome, faPlay);

const height = 25;
const width = 50;

export const gosper = 1;
export const emptyWorld = 2;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagRules: true,
      initial: emptyWorld
    };
  }

  toogleFlagRules = initial => {
    this.setState(prevState => ({
      flagRules: !prevState.flagRules,
      initial
    }));
  };

  render() {
    const { flagRules, initial } = this.state;

    return (
      <div className="App">
        <div className="Title">Conway's Game of Life</div>
        {flagRules ? (
          <Rules toogleFlagRules={this.toogleFlagRules} />
        ) : (
          <World
            height={height}
            width={width}
            initial={initial}
            toogleFlagRules={this.toogleFlagRules}
          />
        )}
        <div className="Footer">
          <a href="#">Check out this project on GitHub</a>
        </div>
      </div>
    );
  }
}

export default App;
