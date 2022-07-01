import { Component } from "react";
import { Square } from "../utils";
import "./Cell.css";

export class Cell extends Square {
  constructor(args) {
    super(args);
    this.value = 0;
    this.hasMoved = false;
    this.hasMerged = false;
  }

  setValue(value) {
    this.value = value ? value : Math.random() > 0.05 ? 2 : 4;
  }

  get isEmpty() {
    return this.value === 0;
  }
}

export class CellView extends Component {
  constructor(props) {
    super(props);
    this.state = { cell: props.cell };
  }

  render() {
    const { cell } = this.state;
    const { value, row, col, hasMoved } = cell;
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
      <div className={`cell${!hasMoved ? " new" : ""}`} data-value={cell.value} style={style}>
        {value}
      </div>
    );
  }
}
