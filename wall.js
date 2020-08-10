class Wall {

    constructor(x1, y1, x2, y2) {
        this.start = createVector(x1, y1);
        this.end = createVector(x2, y2)
    } // could be refactored into a rect to avoid "paper" walls

    show() {
        strokeWeight(2);
        stroke(255);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
}