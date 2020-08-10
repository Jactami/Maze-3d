class Cell {

    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.top = true;
        this.bottom = true;
        this.left = true;
        this.right = true;
        this.visited = false;
    }
}