import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pathtest',
  templateUrl: './pathtest.component.html',
  styleUrls: ['./pathtest.component.css']
})
export class PathtestComponent implements OnInit {
  points: Point[] = [
    { x:80, y: 150 },
    { x:350, y: 300 },
    { x:350, y: 350 },
    { x:480, y: 480 }
  ]
  interSection: Point[] = [];
  testLines: Point[] = [];
  mirrorPoints: Point[] = [];
  mirrorLines: Line[] = [];
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
      console.log(index);
      let newLine: Line = new Line;
      newLine.p1 = this.points[index];
      newLine.p2 = this.points[index - 1];
      this.mirrorLine(newLine)
    }
    this.getIntersections();
    let firstLine: Line = new Line();
    firstLine.p1 = this.points[1];
    firstLine.p2 = this.points[0];
    this.interSection.push(this.find90degToLine(firstLine, this.points[0].width));
  }

  getPoints(points: Point[]):string {
    let finalString: string;
    finalString = 'M ' + points[0].x + ' ' + points[0].y
    for (let index = 1; index < points.length; index++) {
      finalString += ', ' + points[index].x + ' ' + points[index].y;
    }
    return finalString;
  }

  getLine(line: Line):string {
    let finalString: string;
    finalString = 'M ' + line.p1.x + ' ' + line.p1.y + ', '+ line.p2.x + ' ' + line.p2.y;
    return finalString;
  }

  getMirrorPoints():string {
    let finalString: string;
    finalString = 'M ' + this.mirrorPoints[0].x + ' ' + this.mirrorPoints[0].y
    for (let index = 1; index < this.mirrorPoints.length; index++) {
      finalString += ', L' + this.mirrorPoints[index].x + ' M' + this.mirrorPoints[index].y;
    }
    return finalString;
  }

  interdsect(x1, y1, x2, y2, x3, y3, x4, y4): Point {

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
    let ff = this.extendAbscissa(newLine,500,500);

    this.mirrorPoints.push(ff.p1,ff.p2);
    this.mirrorLines.push(ff);
  }



  getIntersections() {

      let l1: Line = new Line;
      let l2: Line = new Line;
      let l3: Line = new Line;


      l2.p1.x = this.mirrorPoints[0].x
      l2.p1.y = this.mirrorPoints[0].y
      l2.p2.x = this.mirrorPoints[1].x
      l2.p2.y = this.mirrorPoints[1].y

      this.testLines.push({"x": l2.p1.x,"y": l2.p1.y});
      this.testLines.push({"x": l2.p2.x,"y": l2.p2.y});

      l1.p1.x = this.mirrorPoints[2].x
      l1.p1.y = this.mirrorPoints[2].y
      l1.p2.x = this.mirrorPoints[3].x
      l1.p2.y = this.mirrorPoints[3].y

      this.testLines.push({"x": l1.p1.x,"y": l1.p1.y});
      this.testLines.push({"x": l1.p2.x,"y": l1.p2.y});

      l3.p1.x = this.mirrorPoints[4].x
      l3.p1.y = this.mirrorPoints[4].y
      l3.p2.x = this.mirrorPoints[5].x
      l3.p2.y = this.mirrorPoints[5].y

      this.testLines.push({"x": l3.p1.x,"y": l3.p1.y});
      this.testLines.push({"x": l3.p2.x,"y": l3.p2.y});

      let linesIntersection: Point =  this.interdsect(l1.p1.x,l1.p1.y,l1.p2.x,l1.p2.y,l2.p1.x,l2.p1.y,l2.p2.x,l2.p2.y)
      let linesIntersection2: Point = this.interdsect(l1.p1.x,l1.p1.y,l1.p2.x,l1.p2.y,l3.p1.x,l3.p1.y,l3.p2.x,l3.p2.y)
      this.interSection.push(linesIntersection);
      this.interSection.push(linesIntersection2);
  }

  extendAbscissa(line: Line, viewBoxHeight: number, viewBoxWidth: number): Line {
    let newLine: Line = new Line;
    let a: number = line.p2.y - line.p1.y;
    let b: number = line.p2.x - line.p1.x;
    let c: number = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
    let cossinus: number = a / c;
    let sinus: number = b / c;

    let newA: number;
    let newC: number;
    let newB: number;

    newA = line.p1.y;
    newC = newA / cossinus;
    newB = newC * sinus;
    newLine.p1.x = line.p1.x - newB;
    newLine.p1.y = 0;

    newA = viewBoxHeight - line.p1.y;
    newC = newA / cossinus;
    newB = newC * sinus;
    newLine.p2.x = line.p1.x + newB;
    newLine.p2.y = viewBoxHeight;
    return newLine;
  }

  intersect(l1:Line, l2:Line): Point {
    if ((l1.p1.x === l1.p2.x && l1.p2.x === l1.p2.x) || (l2.p1.x === l2.p2.x && l2.p2.x === l2.p2.x)) {
      return null
    }
    let denominator = ((l2.p2.y - l2.p1.y) * (l1.p2.x - l1.p1.x) - (l2.p2.x - l2.p1.x) * (l1.p2.y - l1.p1.y))
    if (denominator === 0) {
      return null
    }
    let ua = ((l2.p2.x - l2.p1.x) * (l1.p1.x - l2.p1.y) - (l2.p2.y - l2.p1.y) * (l1.p1.x - l2.p1.x)) / denominator
    let ub = ((l2.p2.x - l2.p1.x) * (l1.p1.y - l2.p1.y) - (l1.p2.y - l1.p1.y) * (l1.p1.x - l2.p1.x)) / denominator
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return null
    }
    let x = l1.p1.x + ua * (l1.p2.x - l1.p1.x)
    let y = l1.p1.y + ua * (l1.p2.y - l1.p1.y)
    return {x, y}
  }

  find90degToLine(line: Line, d: number): Point {
    return {
      x:line.p2.x+d*(line.p1.y-line.p2.y)/Math.sqrt(Math.pow(line.p1.x-line.p2.x,2)+Math.pow(line.p1.y-line.p2.y,2)),
      y:line.p2.y-d*(line.p1.x-line.p2.x)/Math.sqrt(Math.pow(line.p1.x-line.p2.x,2)+Math.pow(line.p1.y-line.p2.y,2))
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