'use strict';

const grid = [];
const nextGenGrid = []

const rows = 50;
const cols = 50;

const interval = 500;

const gridContainer = document.querySelector('#container');

const initOriginalGrid = function() {
    for (let i = 0; i < rows; i++) {
        grid[i] = [];

        for (let j = 0; j < cols; j++) {
            grid[i].push(Math.trunc(Math.random()*2));
        }
    }
}

const buildGrid = function(arr) {
    for (let i = 0; i < rows; i++) {
        const gridRow = document.createElement('div');

        gridRow.className = 'grid__row';
        gridContainer.append(gridRow);

        for (let j = 0; j < cols; j++) {
            const gridItem = document.createElement('div');

            gridItem.className = arr[i][j] ? 'grid__item grid__item_alive' : 'grid__item';
            gridRow.append(gridItem);
        }
    }
}

const countNeighbours = function(row, col) {
    let neighbours = 0;

    col + 1 < cols && grid[row][col + 1] && neighbours++;
    row + 1 < rows && col + 1 < cols && grid[row +1][col + 1] && neighbours++;
    row + 1 < rows && grid[row + 1][col] && neighbours++;
    row + 1 < rows && col - 1 >= 0 && grid[row + 1][col - 1] && neighbours++;
    col - 1 >= 0 && grid[row][col-1] && neighbours++;
    row - 1 >= 0 && col - 1 >= 0 && grid[row - 1][col - 1] && neighbours++;
    row - 1 >= 0 && grid[row - 1][col] && neighbours++;
    row - 1 >= 0 && col + 1 < cols && grid[row - 1][col + 1] && neighbours++;

    return neighbours;
}

const computeNextGenGrid = function () {
    for (let i = 0; i < rows; i++) {
        nextGenGrid[i] = [];

        for (let j = 0; j < cols; j++) {
            let neighbours = countNeighbours(i, j);

            (grid[i][j] && neighbours < 2 && nextGenGrid[i].push(0)) ||
            (grid[i][j] && neighbours > 3 && nextGenGrid[i].push(0)) ||
            (!grid[i][j] && neighbours === 3 && nextGenGrid[i].push(1)) ||
            nextGenGrid[i].push(grid[i][j]);
        }
    }

    return grid;
}

const destroyOriginalGrid = function() {
    gridContainer.innerHTML = ''
}

const resetOriginalGrid = function () {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = nextGenGrid[i][j];
        }
    }
}

const buildNextCycleGrid = function () {
    computeNextGenGrid();
    destroyOriginalGrid();
    buildGrid(nextGenGrid);
    resetOriginalGrid();
}

const startGame = function() {
    initOriginalGrid();
    buildGrid(grid);

    setInterval(function() {
        buildNextCycleGrid();
    }, interval);
}

startGame();




