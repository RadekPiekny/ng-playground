import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pathtest',
  templateUrl: './pathtest.component.html',
  styleUrls: ['./pathtest.component.css']
})
export class PathtestComponent implements OnInit {
  points: Point[] = [
    { x:150, y: 100 },
    { x:350, y: 300 },
    { x:100, y: 400 },
    { x:480, y: 480 }
  ]
  interSection: Point[] = [];
  mirrorPoints: Point[] = [];
  startWidth: number = 20;
  endWidth: number = 0;
  stepDiffWidth: number;
  testPoint: Point;
  constructor() { }

  ngOnInit() {
    this.stepDiffWidth = ( this.startWidth - this.endWidth) / (this.points.length - 1);
    this.points.forEach((p,i) => {
      p.width = this.startWidth - this.stepDiffWidth * i;
    })

    for (let index = this.points.length-1; index > 0; index--) {
      let newLine: Line = new Line;
      newLine.p1 = this.points[index];
      newLine.p2 = this.points[index - 1];
      this.mirrorLine(newLine)
    }
    this.getIntersections();
  }

  getPoints():string {
    let finalString: string;
    finalString = 'M ' + this.points[0].x + ' ' + this.points[0].y
    for (let index = 1; index < this.points.length; index++) {
      finalString += ', ' + this.points[index].x + ' ' + this.points[index].y;
    }
    return finalString;
  }

  getMirrorPoints():string {
    let finalString: string;
    finalString = 'M ' + this.mirrorPoints[0].x + ' ' + this.mirrorPoints[0].y
    for (let index = 1; index < this.mirrorPoints.length; index++) {
      finalString += ', ' + this.mirrorPoints[index].x + ' ' + this.mirrorPoints[index].y;
    }
    return finalString;
  }

  intersect(x1, y1, x2, y2, x3, y3, x4, y4): Point {

    // Check if none of the lines are of length 0
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return null
    }

    let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
    if (denominator === 0) {
      return null
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return null
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return {x, y}
  }

  mirrorLine(line: Line) {
    let xDiff: number = line.p1.x - line.p2.x;
    let yDiff: number = line.p1.y - line.p2.y;
    let ratio: number;

    let newLine: Line = new Line;
    ratio = line.p1.width / Math.hypot(xDiff, yDiff);
    newLine.p1.x = line.p1.x + ratio * yDiff;
    newLine.p1.y = line.p1.y - ratio * xDiff;

    ratio = line.p2.width / Math.hypot(xDiff, yDiff);


    if (xDiff > 0) {
      newLine.p2.x = line.p2.x + ratio * yDiff;
      newLine.p2.y = line.p2.y - ratio * xDiff;

      newLine.p2.x -= newLine.p1.x - newLine.p2.x;
      newLine.p2.y -= newLine.p1.y - newLine.p2.y;
    } else {
      newLine.p2.x = line.p2.x + ratio * yDiff;
      newLine.p2.y = line.p2.y - ratio * xDiff;

      newLine.p2.x += newLine.p2.x - newLine.p1.x;
      newLine.p2.y += newLine.p2.y - newLine.p1.y;
    }


    this.mirrorPoints.push(newLine.p1,newLine.p2);

  }

  getIntersections() {

    for (let index = 0; index < 3; index += 3) {
      let linesIntersection: Point = this.intersect(
        400,
        0,
        400,
        500,
        200,
        0,
        500,
        300,
      )
      this.interSection.push(linesIntersection);
    }


  }
}

class Point {
  x: number;
  y: number;
  width?: number;
}

class Line {
  p1: Point = new Point;
  p2: Point = new Point;
}

class Triangle {
  A: Point;
  B: Point;
  C: Point;
}