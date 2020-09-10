import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-bezier',
  templateUrl: './bezier.component.html',
  styleUrls: ['./bezier.component.css']
})
export class BezierComponent implements OnInit {
  point: IPoint[] = [
    {x: 0, y: 50},
    {x: 150, y: 200},
    {x: 500, y: 200}
  ];
  visiblePoint: IPoint[] = [];
  visibleLine: ILine[] = [];
  visiblePath: string = "";
  t: number;

  @ViewChild('resultPath') resultPath: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ff(t: number) {
    this.visiblePoint = [];
    this.visibleLine = [];
    const q: IQuadraticResult = this.quadratic(this.point[0],this.point[1],this.point[2],t);
    this.visiblePoint.push(q.pointOrigin,q.pointResult,q.line.p0,q.line.p1);
    this.visibleLine.push(q.line);
    this.visiblePath = q.d;
  }

  calcLinearPoint(p0: IPoint, p1: IPoint, t: number): IPoint {
    return {
      x: (1 - t) * p0.x + t * p1.x,
      y: (1 - t) * p0.y + t * p1.y
    }
  }

  quadratic(p0: IPoint, p1: IPoint, p2: IPoint, t: number): IQuadraticResult {
    const linePoint1: IPoint = this.calcLinearPoint(p0,p1,t);
    const linePoint2: IPoint = this.calcLinearPoint(p1,p2,t);
    const pointResult: IPoint = this.calcLinearPoint(linePoint1,linePoint2,t);
    return {
      pointOrigin: p0,
      pointResult: pointResult,
      line: {p0: linePoint1, p1: linePoint2, path: "" },
      d: `M${p0.x} ${p0.y} Q${p1.x} ${p1.y}, ${p2.x} ${p2.y}`
    }
  }

  test(e: Event) {
    this.t = (e.target as HTMLInputElement).valueAsNumber
    this.ff(this.t);
    let wtf = (this.resultPath.nativeElement as SVGGeometryElement).getTotalLength();
    console.log(wtf);
  }

}

interface IPoint {
  x: number;
  y: number;
}

interface ILine {
  p0: IPoint;
  p1: IPoint;
  path: string;
}

interface IQuadraticResult {
  pointOrigin: IPoint;
  pointResult: IPoint;
  line: ILine;
  d: string;
}