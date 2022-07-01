import { Component } from "react";
import { GRID_SIZE } from "../constants";
import { mergeCells, randomChoice, shiftEmptyCellsToEnd } from "../utils";
import "./Board.css";
import { Cell, CellView } from "./Cell";
import { Tile, TileView } from "./Tile";

export default class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = { board: new Board() };
  }

  onKeyDown(event) {
    const { board } = this.state;
    const { key: direction } = event;
    const isValidInput = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(direction);

    if (isValidInput) {
      event.preventDefault();
      const normalizedDirection = direction.replace("Arrow", "").toLowerCase();

      this.setState({ board: board.move(normalizedDirection) });
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown.bind(this));
  }

  render() {
    const { cells, size, tiles } = this.state.board;
    const cellGap = `${100 / (size * size * 4)}vmin`;
    const style = { "--board-size": size, "--cell-gap": cellGap, "--side-length": `${Math.min(size * 8, 50)}vw` };

    return (
      <div id="board" style={style}>
        <div className="tiles">
          {tiles.map((tile) => (
            <TileView tile={tile} key={tile.id}></TileView>
          ))}
        </div>
        <div className="cells">
          {cells.map((cell) => (
            <CellView cell={cell} key={cell.id}></CellView>
          ))}
        </div>
      </div>
    );
  }
}

class Board {
  constructor() {
    this.size = GRID_SIZE;
    this.tiles = [];
    this.cells = [];

    for (let i = 0; i < this.size * this.size; i++) {
      const row = i % this.size;
      const col = Math.floor(i / this.size);

      this.tiles.push(new Tile({ row, col, id: i }));
      this.cells.push(new Cell({ row, col, id: i }));
    }

    this.randomEmptyCell.setValue();
    this.randomEmptyCell.setValue();
  }

  move(direction) {
    switch (direction) {
      case "up":
        this._move(this.cellsByCol);
        break;
      case "down":
        this._move(this.cellsByCol.map((col) => col.reverse()));
        break;
      case "left":
        this._move(this.cellsByRow);
        break;
      case "right":
        this._move(this.cellsByRow.map((row) => row.reverse()));
        break;
      default:
        break;
    }

    this.cells.forEach((cell) => {
      cell.hasMerged = false;
    });
    this.randomEmptyCell.setValue();

    return this;
  }

  _move(rowsOrColumns) {
    for (let i = 0; i < rowsOrColumns.length; i++) {
      const row = rowsOrColumns[i];
      shiftEmptyCellsToEnd(row);
      mergeCells(row);
      shiftEmptyCellsToEnd(row);
    }
  }

  get emptyCells() {
    return this.cells.filter((cell) => cell.value === 0);
  }

  get randomEmptyCell() {
    return randomChoice(this.emptyCells);
  }

  get cellsByCol() {
    const columns = new Array(this.size).fill().map(() => []);

    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      columns[cell.col].push(cell);
    }

    return columns.map((col) => col.sort((cell1, cell2) => cell1.row - cell2.row));
  }

  get cellsByRow() {
    const rows = new Array(this.size).fill().map(() => []);

    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      rows[cell.row].push(cell);
    }

    return rows.map((row) => row.sort((cell1, cell2) => cell1.col - cell2.col));
  }
}
