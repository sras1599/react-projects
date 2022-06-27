import { Component } from "react";
import { Tile, TileView } from "./Tile";
import { Cell, CellView } from "./Cell";
import { GRID_SIZE } from "../constants";
import { randomString } from "../utils";
import "./Board.css";

export default class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = { board: new Board() };
  }

  render() {
    const { cells, size, tiles } = this.state.board;
    const cellGap = `${100 / (size * size * 4)}vmin`;
    const style = { "--board-size": size, "--cell-gap": cellGap, "--side-length": `${Math.min(size * 8, 50)}vw` };

    return (
      <div id="board" style={style}>
        {tiles.map((tile) => (
          <TileView tile={tile} key={randomString()}></TileView>
        ))}
        {cells.map((cell) => (
          <CellView cell={cell} key={randomString()}></CellView>
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

    this.randomEmptyTile.addCell();
    this.randomEmptyTile.addCell();
  }

  get cells() {
    return this.tiles.map((tile) => tile.cell).filter(Boolean);
  }

  get emptyTiles() {
    return this.tiles.filter((tile) => !tile.cell);
  }

  get randomEmptyTile() {
    return this.emptyTiles[Math.floor(Math.random() * this.emptyTiles.length)];
  }
}
