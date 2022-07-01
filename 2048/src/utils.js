export const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const shiftEmptyCellsToEnd = (rowOrColumn) => {
  let shiftedElements = 0;

  for (let i = 0; i < rowOrColumn.length; i++) {
    const cell = rowOrColumn[i];

    if (cell.value !== 0) {
      cell.hasMoved = true;
      [rowOrColumn[shiftedElements].value, cell.value] = [cell.value, rowOrColumn[shiftedElements].value];
      shiftedElements++;
    }
  }

  return rowOrColumn;
};

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
