import React from "react";
import Gosper from "../../assets/gosper_white.png";
import "./Rules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { emptyWorld, gosper } from "../../App";

const rules = props => {
  return (
    <React.Fragment>
      <div>
        <div className="FlexContainer">
          <div
            className="Box"
            onClick={() => {
              props.toogleFlagRules(gosper);
            }}
          >
            Let's try Gosper Glider Gun Pattern
            <img
              src={Gosper}
              alt="Gosper Glider Gun img"
              className={"GosperPatter"}
            />
          </div>

          <div
            className="Box"
            onClick={() => {
              props.toogleFlagRules(emptyWorld);
            }}
          >
            Create your own Patterns
            <div className={"Plus"}>
              <FontAwesomeIcon icon="plus" />
            </div>
          </div>
        </div>
        <div className={"Rules"}>
          The universe of the Game of Life is an infinite, two-dimensional
          orthogonal grid of square cells, each of which is in one of two
          possible states, alive or dead, (or populated and unpopulated,
          respectively). Every cell interacts with its eight neighbours, which
          are the cells that are horizontally, vertically, or diagonally
          adjacent. At each step in time, the following transitions occur:
          <ul>
            <li>
              Any live cell with fewer than two live neighbors dies, as if by
              underpopulation
            </li>

            <li>
              Any live cell with two or three live neighbors lives on to the
              next generation
            </li>

            <li>
              Any live cell with more than three live neighbors dies, as if by
              overpopulation.
            </li>

            <li>
              Any dead cell with exactly three live neighbors becomes a live
              cell, as if by reproduction.
            </li>
          </ul>
          The initial pattern constitutes the seed of the system. The first
          generation is created by applying the above rules simultaneously to
          every cell in the seed; births and deaths occur simultaneously, and
          the discrete moment at which this happens is sometimes called a tick.
          Each generation is a pure function of the preceding one. The rules
          continue to be applied repeatedly to create further generations.
          <a
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            target="_blanck"
          >
            [From Wikipedia]
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default rules;
