const cols = 10;
const rows = 10;
const unit = 20;
let maze;
let camera;

function setup() {
    createCanvas(windowWidth - 1, windowHeight - 1);
    maze = new Maze(cols, rows, unit);
    const start = random(maze.cells);
    const startX = start.i * unit + unit / 2;
    const startY = start.j * unit + unit / 2;
    camera = new Camera(startX, startY);
}

function draw() {
    background(0);
    const fr = frameRate();

    // render "3D" view
    camera.lookAt(maze.walls);
    camera.renderView();

    // show minimap
    push();
    translate(10, 10);
    scale(0.15 * width / (cols * maze.unit));
    rectMode(CORNER);
    fill(0);
    rect(-5, -5, cols * unit + 10, rows * unit + 10);
    maze.show();
    camera.show();
    pop();

    // show frames
    fill(255, 0, 0);
    textSize(24);
    text(round(fr), width - 50, 30);

    // listen for user actions
    const moveSpd = 20 / fr;
    const rotSpd = 2 / fr;
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        camera.rotate(-rotSpd);
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        camera.rotate(rotSpd);
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        camera.move(moveSpd, maze.walls);
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        camera.move(-moveSpd, maze.walls);
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 1, windowHeight - 1);
    camera.initRays(); // adjust amount of rays to keep resolution
}