class Ray {

    constructor(x, y, angle) {
        this.pos = createVector(x, y);
        this.dir = p5.Vector.fromAngle(angle);
        this.end;
    }

    cast(walls) {
        this.end = undefined;
        let record = Infinity;

        for (let wall of walls) {
            const x1 = wall.start.x;
            const y1 = wall.start.y;
            const x2 = wall.end.x;
            const y2 = wall.end.y;
            const x3 = this.pos.x;
            const y3 = this.pos.y;
            const x4 = this.pos.x + this.dir.x;
            const y4 = this.pos.y + this.dir.y;

            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (den === 0) {
                continue;
            }

            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            if (t >= 0 && t <= 1 && u >= 0) { // intersection point found;
                const x = x1 + t * (x2 - x1);
                const y = y1 + t * (y2 - y1);
                const pt = createVector(x, y);

                const d = dist(this.pos.x, this.pos.y, pt.x, pt.y);
                if (d < record) {
                    record = d;
                    this.end = pt;
                }
            }
        }
    }

    setAngle(angle) {
        this.dir = p5.Vector.fromAngle(angle);
    }

    show() {
        if (this.end) {
            strokeWeight(1)
            stroke(255, 255, 224, 20);
            line(this.pos.x, this.pos.y, this.end.x, this.end.y);
        }
    }
}