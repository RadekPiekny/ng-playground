import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abscissa-line-convertor',
  templateUrl: './abscissa-line-convertor.component.html',
  styleUrls: ['./abscissa-line-convertor.component.css']
})
export class AbscissaLineConvertorComponent implements OnInit {
  viewBoxWidth: number = 100;
  viewBoxHeight: number = 100;
  originalP1: Point = new Point;
  originalP2: Point = new Point;
  originalLine: Line = new Line;
  newLine: Line = new Line;

  constructor() { }

  ngOnInit() {
    this.originalP1.x = 95;
    this.originalP1.y = 91;
    this.originalP2.x = 90;
    this.originalP2.y = 88;

    this.originalLine.p1 = this.originalP1;
    this.originalLine.p2 = this.originalP2;
    this.newLine = this.extendAbscissa(this.originalLine,100,100);
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

  convertRadToDegree(rad: number) {
    return rad * 180 / Math.PI;
  }

  convertDegreeToRad(degree: number) {
    return degree * Math.PI / 180;
  }

}

class Point {
  x: number;
  y: number;
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