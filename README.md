## Maze 3D
This program generates a random passable maze in JavaScript using [p5.js](https://p5js.org/). 

## Maze Generation
A two dimensional maze is generated by a depth-first search and backtracking:
1. Given a current cell as a parameter
2. Mark the current cell as visited
3. While the current cell has unvisited neighbour cells
	1. Choose one of the unvisited neighbours
	2. Remove the wall between the current cell and the chosen cell
	3. Invoke the routine recursively for a chosen cell

## Maze Visualization
The Vizalisation is done by raycasting. In this technique a cone of rays is sent out in a straight line from the player until the rays hit their first obstacle (i.e. a wall). These rays report back the distance traveled which is used to determine the size of the obstacle. Then a small rectangle is drawn according the size to represent a section of the wall. If the length of a ray is higher, the obstacle is further awy and thus it has to be drawn with a lower height to resemble the illusion of distance (and vice versa for small lengths).
More in-depth information about raycasting: https://lodev.org/cgtutor/raycasting.html