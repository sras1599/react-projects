import { Component } from "react";
import "./Tile.css";

export class Tile {
  constructor({ row, col }) {
    this.row = row;
    this.col = col;
    this.id = `${this.row}_${this.col}`;
  }
}

export class TileView extends Component {
  constructor(props) {
    super(props);
    this.state = { tile: props.tile };
  }

  render() {
    return <div className="tile"></div>;
  }
}
