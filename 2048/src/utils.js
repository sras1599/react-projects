export const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const shiftEmptyCellsToEnd = (row) => {
  let shiftedElements = 0;

  for (let i = 0; i < row.length; i++) {
    const cell = row[i];

    if (cell.value !== 0) {
      cell.hasMoved = true;
      [row[shiftedElements].value, cell.value] = [cell.value, row[shiftedElements].value];
      shiftedElements++;
    }
  }

  return row;
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
