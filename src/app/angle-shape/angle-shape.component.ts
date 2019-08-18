import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angle-shape',
  templateUrl: './angle-shape.component.html',
  styleUrls: ['./angle-shape.component.css']
})
export class AngleShapeComponent implements OnInit {
  data: Data[] = [
    {name: 'mySDC'},
    {name: 'Mood Monitor'},
    {name: 'myCMS'},
    {name: 'iResourcing'},
    {name: 'Klik'},
    {name: 'Workday automation'},
    {name: '6'},
    {name: '7'},
  ]
  constructor() { }

  ngOnInit() {
  }

  test(d: Data) {

  }
}

class Data {
  name: string;
}