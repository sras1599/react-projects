import { Component } from "react";
import "./Cell.css";

export class Cell {
  constructor(tile, value) {
    this.tile = tile;
    this.value = value;
  }

  get id() {
    return `cell_${this.tile.row}_${this.tile.col}`;
  }
}

export class CellView extends Component {
  constructor(props) {
    super(props);
    this.state = { cell: props.cell };
  }

  render() {
    const { value, tile } = this.state.cell;
    const { row, col } = tile;
    const power = Math.log2(value);

    const backgroundLightness = 100 - power * 9;
    const fontSize = `${3 - 0.25 * value.toString().length}em`;
    const style = {
      "--row": row,
      "--col": col,
      "--bg-lightness": `${backgroundLightness}%`,
      "--text-lightness": `${backgroundLightness <= 50 ? 90 : 10}%`,
      "--font-size": fontSize,
    };

    return (
      <div className="cell" style={style}>
        {this.state.cell.value}
      </div>
    );
  }
}
