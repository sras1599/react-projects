import { Component } from "react";
import { Tile, TileView } from "./Tile";
import "./Board.css";

export default class BoardView extends Component {
  constructor(props) {
    super(props);
    this.state = { board: new Board() };
  }

  render() {
    const { tiles, size } = this.state.board;
    const cellGap = `${100 / (size * size * 4)}vmin`;
    const style = { "--board-size": size, "--cell-gap": cellGap, "--side-length": `${Math.min(size * 8, 50)}vw` };

    return (
      <div id="board" style={style}>
        {tiles.map((tile) => (
          <TileView tile={tile} key={tile.id}></TileView>
        ))}
      </div>
    );
  }
}

class Board {
  constructor() {
    this.size = 4;
    this.tiles = [];

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const tile = new Tile({ row, col });
        this.tiles.push(tile);
      }
    }
  }
}
