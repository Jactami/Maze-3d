class Camera {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.fov = 90;
        this.heading = random(0, 2 * PI);
        this.rays = [];
        this.initRays();
    }

    initRays() {
        this.rays = [];
        // use i += (this.fov / width) to create slides with width of 1 pixel, but worse frame rate
        for (let i = -this.fov / 2; i <= this.fov / 2; i += (this.fov * 3 / width)) {
            this.rays.push(new Ray(this.pos.x, this.pos.y, radians(i) + this.heading));
        }
    }

    move(spd, walls) {
        const dir = p5.Vector.fromAngle(this.heading);
        dir.setMag(spd);
        const newPos = p5.Vector.add(this.pos, dir);
        const pt = this.intersection(this.pos, newPos, walls);
        if (!pt) {
            this.pos = newPos;
            for (let i = 0; i < this.rays.length; i++) {
                this.rays[i].pos = this.pos;
            }
        }
    }

    intersection(start, end, walls) {
        for (let wall of walls) {
            const x1 = wall.start.x;
            const y1 = wall.start.y;
            const x2 = wall.end.x;
            const y2 = wall.end.y;
            const x3 = start.x;
            const y3 = start.y;
            const x4 = end.x;
            const y4 = end.y;

            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            if (den === 0) {
                continue;
            }

            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

            if (t >= 0 && t <= 1 && u >= 0 && u <= 1) { // intersection point found;
                const x = x1 + t * (x2 - x1);
                const y = y1 + t * (y2 - y1);
                return createVector(x, y);
            }
        }
        return null; // no intersection point found
    }

    rotate(angle) {
        this.heading += angle;

        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].setAngle(this.rays[i].dir.heading() + angle);
        }
    }

    lookAt(walls) {
        for (let ray of this.rays) {
            ray.cast(walls);
        }
    }

    show() {
        for (let ray of this.rays) {
            ray.show();
        }
        noStroke();
        fill(255, 0, 0);
        circle(this.pos.x, this.pos.y, floor(unit * 0.2));
    }

    renderView() {
        // draw background
        rectMode(CORNER);
        noStroke();
        const lerpStep = 1;
        const skyCol = color(135, 206, 250);
        const black = color(0);
        const groundCol = color(244, 164, 96);
        for (let i = 0; i < height / 2; i += lerpStep) {
            const amt = i / (height / 2);
            const skyC = lerpColor(black, skyCol, amt);
            fill(skyC);
            rect(0, i, width, lerpStep);
            const groundC = lerpColor(black, groundCol, amt);
            fill(groundC);
            rect(0, i + height / 2, width, lerpStep);
        }

        // draw walls
        let view = [];
        for (let ray of this.rays) {
            let d = Infinity;
            if (ray.end) {
                d = dist(ray.pos.x, ray.pos.y, ray.end.x, ray.end.y);
                const a = ray.dir.heading() - this.heading;
                d *= cos(a);
            }
            view.push(d);
        }

        const w = width / view.length;
        noStroke();
        const maxD = max(cols, rows) * unit / width;
        for (let i = 0; i < view.length; i++) {
            const d = view[i] / width;
            const b = map(d, 0, maxD, 255, 0);
            const h = (unit / 2) / d;
            fill(b);
            rectMode(CENTER);
            rect(i * w + w / 2, height / 2, w + 1, h);
        }
    }
}