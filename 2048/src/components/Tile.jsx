import { Component } from "react";
import { Square } from "../utils";
import "./Tile.css";

export class Tile extends Square {}

export class TileView extends Component {
  constructor(props) {
    super(props);
    this.state = { tile: props.tile };
  }

  render() {
    return <div className="tile"></div>;
  }
}
