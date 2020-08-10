class Maze {

    constructor(cols, rows, unit) {
        this.cols = cols;
        this.rows = rows;
        this.unit = unit;
        this.cells = [];
        this.walls = [];

        if (this.rows > 0 && this.cols > 0) {
            this.initCells();
            this.generateMaze(random(this.cells));
            this.generateWalls();
        }
    }

    initCells() {
        this.cells = [];
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                this.cells.push(new Cell(i, j));
            }
        }
    }

    generateMaze(start) {
        let stack = [];
        let current = start;
        while (current) { // removed recursion to avoid exceeding max recursion stack size
            current.visited = true;
            let neighbors = this.getNeighbors(current);
            let neighbor = random(neighbors.filter(neighbor => !neighbor.visited));
            if (neighbor) {
                this.removeWall(current, neighbor);
                stack.push(current);
                stack.push(neighbor);
            }
            current = stack.pop();
        }
    }

    getNeighbors(cell) {
        let neighbors = [];

        const i = cell.i;
        const j = cell.j;

        neighbors.push(this.cells[this.getIndex(i, j - 1)]);
        neighbors.push(this.cells[this.getIndex(i, j + 1)]);
        neighbors.push(this.cells[this.getIndex(i - 1, j)]);
        neighbors.push(this.cells[this.getIndex(i + 1, j)]);

        return neighbors.filter(neighbor => neighbor);
    }

    getIndex(i, j) {
        if (i < 0 || j < 0 || i > this.cols - 1 || j > this.rows - 1)
            return -1;

        return i + this.cols * j;
    }

    removeWall(cellA, cellB) {
        const dX = cellA.i - cellB.i;
        if (dX === 1) {
            cellA.left = false;
            cellB.right = false;
        } else if (dX === -1) {
            cellA.right = false;
            cellB.left = false;
        }

        const dY = cellA.j - cellB.j;
        if (dY === 1) {
            cellA.top = false;
            cellB.bottom = false;
        } else if (dY === -1) {
            cellA.bottom = false;
            cellB.top = false;
        }
    }

    generateWalls() {
        this.walls = [];
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                const cell = this.cells[this.getIndex(i, j)];
                const x = cell.i * this.unit;
                const y = cell.j * this.unit;
                if (j === 0 && cell.top) {
                    this.walls.push(new Wall(x, y, x + this.unit, y));
                }
                if (i === 0 && cell.left) {
                    this.walls.push(new Wall(x, y, x, y + this.unit));
                }
                if (cell.bottom) {
                    this.walls.push(new Wall(x, y + this.unit, x + this.unit, y + this.unit));
                }
                if (cell.right) {
                    this.walls.push(new Wall(x + this.unit, y, x + this.unit, y + this.unit));
                }
            }
        }
    }

    show() {
        for (let wall of this.walls) {
            wall.show();
        }
    }
}