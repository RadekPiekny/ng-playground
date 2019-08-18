import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pathtest',
  templateUrl: './pathtest.component.html',
  styleUrls: ['./pathtest.component.css']
})
export class PathtestComponent implements OnInit {
  points: Point[] = [
    { x:250, y: 0 },
    { x:350, y: 100 },
    { x:150, y: 200 },
    { x:350, y: 300 },
    { x:100, y: 400 },
    { x:500, y: 500 }
  ]
  startWidth: number = 30;
  endWidth: number = 3;
  stepDiffWidth: number;
  testPoint: Point;
  constructor() { }

  ngOnInit() {
    this.stepDiffWidth = ( this.startWidth - this.endWidth) / (this.points.length - 1);
    this.points.forEach((p,i) => {
      p.width = this.startWidth - this.stepDiffWidth * i;
    })
    this.testPoint = this.intersect(0,0,500,500,240,0,250,500);
    console.log(this.points);
  }

  getPoints():string {
    let finalString: string;
    finalString = 'M ' + this.points[0].x + ' ' + this.points[0].y 
    for (let index = 1; index < this.points.length; index++) {
      finalString += ', ' + this.points[index].x + ' ' + this.points[index].y;
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

  mirrorLine(line: Line): Line {
    let xDiff = line.p2.x - line.p1.x;
    let yDiff = line.p2.y - line.p1.y;
    let ratio = xDiff / yDiff;

    let newLine: Line = new Line;
    newLine.p1.x = line.p2.x + 6;
    return null;
  }

}

class Point {
  x: number;
  y: number;
  width?: number;
}

class Line {
  p1: Point;
  p2: Point;
}

class Triangle {
  A: Point;
  B: Point;
  C: Point;
}