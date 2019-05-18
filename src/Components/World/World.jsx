import React, { Component } from "react";
import Cell from "../Cell/Cell";
import "./World.css";
import { gosperGliderGun } from "../../Patterns/GosperGliderGun";
import { gosper } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const period = 500;

class World extends Component {
  constructor(props) {
    super(props);
    this.state = {
      population: this.createGrid(),
      generation: 1
    };
  }

  componentDidMount() {
    const { initial } = this.props;
    console.log("initial: " + initial + " gosper: " + gosper);
    if (initial === gosper) {
      this.loadGosperGliderGunPattern();
    }
  }

  startTimer = () => {
    setInterval(this.createNewGeneration, period);
  };

  cellClickHandler = (x, y) => {
    const newPopulation = JSON.parse(JSON.stringify(this.state.population));
    newPopulation[x][y].alive = !newPopulation[x][y].alive;
    this.setState({
      population: newPopulation
    });
  };

  loadGosperGliderGunPattern = () => {
    this.setState({
      population: gosperGliderGun
    });
  };

  render() {
    const { population } = this.state;

    return (
      <React.Fragment>
        <div className="ButtonContainer">
          <div className="ControlButton" onClick={this.startTimer}>
            <FontAwesomeIcon icon="play" />
          </div>

          <div className="ControlButton" onClick={this.props.toogleFlagRules}>
            <FontAwesomeIcon icon="home" />
          </div>
        </div>
        <div className="World">
          <div className="GenerationCounter">
            Generation: <span className="Counter">{this.state.generation}</span>{" "}
          </div>
          {population.map((row, i) => {
            return (
              <div className="Line" key={i}>
                {row.map(cell => {
                  return (
                    <Cell
                      x={cell.x}
                      y={cell.y}
                      alive={cell.alive}
                      key={cell.x + "," + cell.y}
                      cellClickHandler={this.cellClickHandler}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }

  createNewGeneration = () => {
    const { height, width } = this.props;
    const { population } = this.state;

    const copyPopulation = JSON.parse(JSON.stringify(population));

    for (let y = 0; y < height; y++) {
      const row = copyPopulation[y];

      for (let x = 0; x < width; x++) {
        const cell = row[x];

        const livingNeighbors = this.countAliveNeigtbor(x, y, population);

        if (cell.alive) {
          if (livingNeighbors < 2 || livingNeighbors > 3) {
            cell.alive = false;
          }
        } else {
          if (livingNeighbors === 3) {
            cell.alive = true;
          }
        }
      }
    }

    this.setState(
      prevState => ({
        population: copyPopulation,
        generation: prevState.generation + 1
      }),
      () => {
        console.log("New Generation created at " + new Date().getTime());
      }
    );
  };

  countAliveNeigtbor = (x, y, population) => {
    const { height, width } = this.props;

    const neighbor = [];

    // Row Above
    if (x - 1 >= 0 && y + 1 < height) {
      neighbor.push(population[y + 1][x - 1]);
    }

    if (y + 1 < height) {
      neighbor.push(population[y + 1][x]);
    }

    if (x + 1 < width && y + 1 < height) {
      neighbor.push(population[y + 1][x + 1]);
    }

    //Same Row
    if (x - 1 >= 0) {
      neighbor.push(population[y][x - 1]);
    }

    if (x + 1 < width) {
      neighbor.push(population[y][x + 1]);
    }

    //Row below
    if (x - 1 >= 0 && y - 1 >= 0) {
      neighbor.push(population[y - 1][x - 1]);
    }

    if (y - 1 >= 0) {
      neighbor.push(population[y - 1][x]);
    }

    if (x + 1 < width && y - 1 >= 0) {
      neighbor.push(population[y - 1][x + 1]);
    }

    const cellAlive = neighbor.filter(n => {
      if (n) {
        return n.alive;
      } else {
        return false;
      }
    });

    return cellAlive.length;
  };

  createGrid = () => {
    const { height, width } = this.props;

    const grid = new Array(height);
    for (let x = 0; x < height; x++) {
      const row = new Array(width);
      for (let y = 0; y < width; y++) {
        row[y] = { x: x, y: y, alive: false }; //Math.random() > 0.4 };
      }
      grid[x] = row;
    }

    return grid;
  };
}

export default World;
