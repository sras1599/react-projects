export const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const shiftEmptyCellsToEnd = (rowOrColumn) => {
  let shifted = false;

  while (!shifted) {
    shifted = true;

    for (let i = 0; i < rowOrColumn.length - 1; i++) {
      const fromCell = rowOrColumn[i + 1];
      const toCell = rowOrColumn[i];

      if (canSwapCells(fromCell, toCell)) {
        shifted = false;
        fromCell.hasMoved = true;
        toCell.hasMoved = true;

        [rowOrColumn[i], rowOrColumn[i + 1]] = [rowOrColumn[i + 1], rowOrColumn[i]];
        [fromCell.row, fromCell.col, toCell.row, toCell.col] = [toCell.row, toCell.col, fromCell.row, fromCell.col];
      }
    }
  }

  return rowOrColumn;
};

const canSwapCells = (fromCell, toCell) => toCell.isEmpty && !fromCell.isEmpty;

export const mergeCells = (row) => {
  for (let i = 0; i < row.length - 1; i++) {
    const targetCell = row[i];
    const sourceCell = row[i + 1];

    if (targetCell.value === sourceCell.value && targetCell.value !== 0 && !targetCell.hasMerged) {
      targetCell.value *= 2;
      targetCell.hasMerged = true;

      sourceCell.value = 0;
      sourceCell.hasMerged = true;
    }
  }
};

export class Square {
  constructor({ row, col, id }) {
    this.row = row;
    this.col = col;
    this.id = id;
  }
}
