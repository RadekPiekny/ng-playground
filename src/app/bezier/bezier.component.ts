import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bezier',
  templateUrl: './bezier.component.html',
  styleUrls: ['./bezier.component.css']
})
export class BezierComponent implements OnInit {
  pointOne: IPoint = {x: 50, y: 50};
  pointTwo: IPoint = {x: 200, y: 200};
  resultPoint: IPoint;
  t: number;
  constructor() { }

  ngOnInit(): void {
  }

  calcPoint(t: number) {
    
    let Lx: number = (1 - t) * this.pointOne.x + t * this.pointTwo.x;
    let Ly: number = (1 - t) * this.pointOne.y + t * this.pointTwo.y;
    const L: IPoint = {x: Lx, y: Ly};
    this.resultPoint = L;
    console.log(Lx);
  }

  test(e: Event) {
    this.t = (e.target as HTMLInputElement).valueAsNumber
    this.calcPoint(this.t);
  }

}

interface IPoint {
  x: number;
  y: number;
}