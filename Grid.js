const Grid_Size = 4;
const Cell_Size = 20;
const Cell_Gap = 2;

export default class Grid {
    #cells;
    constructor(gridElement) {
        gridElement.style.setProperty('--grid-size', Grid_Size);
        gridElement.style.setProperty('--cell-size', `${Cell_Size}vmin`);
        gridElement.style.setProperty('--cell-gap', `${Cell_Gap}vmin`);
        this.#cells = createCellEllements(gridElement).map((cellElement, index) => {
            return new Cell(cellElement, index % Grid_Size, Math.floor(index / Grid_Size));
        });
    }

    get cellsByColumn() {
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || [];
            cellGrid[cell.x][cell.y] = cell;
            return cellGrid;
        }, []);
    }
    get #emptyCells() {
        return this.#cells.filter((cell) => cell.tile == null);
    }

    randomEmptyCell() {
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
        return this.#emptyCells[randomIndex];
    }
}

class Cell {
    #cellElement;
    #x;
    #y;
    #tile;
    #mergeTile;
    constructor(cellElement, x, y) {
        this.#cellElement = cellElement;
        this.#x = x;
        this.#y = y;
    }
    get tile() {
        return this.#tile;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    set tile(value) {
        this.#tile = value;
        if (value == null) return;
        this.#tile.x = this.#x;
        this.#tile.y = this.#y;
    }

    get mergeTile() {
        return this.#mergeTile;
    }

    set mergeTile(value) {
        this.#mergeTile = value;
        if (value == null) return;

        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }

    canAccept(tile) {
        return this.tile == null || (this.mergeTile == null && this.tile?.value == tile.value);
    }
}

function createCellEllements(gridElement) {
    const cells = [];
    for (let i = 0; i < Grid_Size * Grid_Size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cells.push(cell);
        gridElement.append(cell);
    }

    return cells;
}
