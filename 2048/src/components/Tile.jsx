import { Component } from "react";
import { GRID_SIZE } from "../constants";
import { Cell } from "./Cell";
import "./Tile.css";

export class Tile {
  constructor() {
    this.row = Tile.counter % GRID_SIZE;
    this.col = Math.floor(Tile.counter++ / GRID_SIZE);
    this.cell = null;
  }

  addCell() {
    this.cell = new Cell(this);
  }

  get id() {
    return `tile_${this.row}_${this.col}`;
  }
  
  get isEmpty() {
    return !this.cell;
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
