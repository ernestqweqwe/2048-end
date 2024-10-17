import { Grid } from './Grid.js';
import { Tile } from './Tile.js';

const gameBoard = document.getElementById('game-board');

const grid = new Grid(gameBoard);

grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));
setupInputOnce();

function setupInputOnce() {
    window.addEventListener('keydown', handleInputOnce, { once: true });
}

function handleInputOnce(event) {
    switch (event.key) {
        case 'ArrowUp':
            grid.moveUp();
            break;
        case 'ArrowDown':
            grid.moveDown();
            break;
        case 'ArrowLeft':
            grid.moveLeft();
            break;
        case 'ArrowRight':
            grid.moveRight();
            break;
        default:
            setupInputOnce();
            return;
    }

    setupInputOnce();
}

function moveUp() {
    slideTiles(grid.cellsGroupedByColumn);
}
