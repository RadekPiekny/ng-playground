import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abscissa-line-convertor',
  templateUrl: './abscissa-line-convertor.component.html',
  styleUrls: ['./abscissa-line-convertor.component.css']
})
export class AbscissaLineConvertorComponent implements OnInit {
  originalP1: Point = new Point;
  originalP2: Point = new Point;
  originalLine: Line = new Line;
  newLine: Line = new Line;

  constructor() { }

  ngOnInit() {
    this.originalP1.x = 20;
    this.originalP1.y = 30;
    this.originalP2.x = 60;
    this.originalP2.y = 70;

    this.originalLine.p1 = this.originalP1;
    this.originalLine.p2 = this.originalP2;
    this.newLine = this.abscissaToLine(this.originalLine,100,100);
  }

  abscissaToLine(line: Line, viewBoxHeight: number, viewBoxWidth: number): Line {
    let newP1: Point = new Point;
    let newP2: Point = new Point;
    let newLine: Line = new Line;

    if (line.p2.y == line.p1.y && line.p2.x == line.p1.x) {
      throw new Error('It is a point dude not an abscissa...');
    }

    if (line.p2.y == line.p1.y) {
      newLine.p1.x = 0;
      newLine.p1.y = line.p1.y;
      newLine.p2.x = viewBoxWidth;
      newLine.p2.y = line.p2.y;
      return newLine;
    }

    if (line.p2.x == line.p1.x) {
      newLine.p1.x = line.p1.x;
      newLine.p1.y = 0;
      newLine.p2.x = line.p2.x;
      newLine.p2.y = viewBoxHeight;
      return newLine;
    }

    let ratioWidthtoHeight: number = (line.p2.x - line.p1.x) / (line.p2.y - line.p1.y);
    let ratioToLeft: number = (viewBoxHeight - line.p1.y) / (line.p2.y - line.p1.y);
    newP1.x = line.p1.x - Math.abs((viewBoxHeight - line.p1.y) / ratioToLeft * ratioWidthtoHeight);
    newP2.x = line.p2.x + Math.abs((viewBoxHeight - line.p2.y) / ratioToLeft * ratioWidthtoHeight);
    newP1.y = line.p1.y - (viewBoxWidth - line.p1.x) / ratioToLeft * ratioWidthtoHeight;
    newP2.y = line.p2.y - (viewBoxWidth - line.p2.x) / ratioToLeft * ratioWidthtoHeight;
    newLine.p1 = newP1;
    newLine.p2 = newP2;
    return newLine;

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