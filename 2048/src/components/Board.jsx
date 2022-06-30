import { Component } from "react";
import { GRID_SIZE } from "../constants";
import { randomChoice } from "../utils";
import "./Board.css";
import { CellView } from "./Cell";
import { Tile, TileView } from "./Tile";

export default class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = { board: new Board() };
  }

  onKeyDown(event) {
    const { key: direction } = event;
    const isValidInput = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(direction);

    if (isValidInput) {
      event.preventDefault();
      const normalizedDirection = direction.replace("Arrow", "").toLowerCase();

      this.state.board.move(normalizedDirection);
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
        {tiles.map((tile) => (
          <TileView tile={tile} key={tile.id}></TileView>
        ))}
        {cells.map((cell) => (
          <CellView cell={cell} key={cell.id}></CellView>
        ))}
      </div>
    );
  }
}

class Board {
  constructor() {
    Tile.counter = 0;
    this.size = GRID_SIZE;
    this.tiles = Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_) => new Tile());

    this.randomEmptyTile.populateCell();
    this.randomEmptyTile.populateCell();
  }

  move(direction) {
    switch (direction) {
      case "up":
        this.moveUp();
        break;
      case "down":
        this.moveDown();
        break;
      case "left":
        this.moveLeft();
        break;
      case "right":
        this.moveRight();
        break;
      default:
        break;
    }
  }

  moveUp() {}

  moveDown() {}

  moveLeft() {}

  moveRight() {}

  get cells() {
    return this.tiles.map((tile) => tile.cell).filter((cell) => cell.value !== 0);
  }

  get emptyTiles() {
    return this.tiles.filter((tile) => tile.cell.value === 0);
  }

  get randomEmptyTile() {
    return randomChoice(this.emptyTiles);
  }

	get tilesByRow() {
    return this.tiles.reduce((grid, tile) => {
      grid[tile.row] = grid[tile.row] || [];
      grid[tile.row][tile.col] = tile;
			return grid;
    }, []);
  }

  get tilesByColumn() {
    return this.tiles.reduce((grid, tile) => {
      grid[tile.col] = grid[tile.col] || [];
      grid[tile.col][tile.row] = tile;
			return grid;
    }, []);
  }
}
