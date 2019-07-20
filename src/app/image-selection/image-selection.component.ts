import { Component, OnInit, WrappedValue } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.css'],
  animations: [
    trigger('flyin',[
      state('empty', style({ opacity: 0 })),
      state('full', style({ opacity: 1 })),
      transition('* => empty',[
        animate('3000ms')
      ]),
      transition('* => full',[
        animate('300ms')
      ]),
      transition('* => *', [
        query('label', style({ opacity: 1 })),
        query('label', animate(1000, style({ left: '200px' })))
      ]),
    ])
  ]
})
export class ImageSelectionComponent implements OnInit {
  user: User = {firstName: 'Radek', secondName: 'Piekny', age: 34};
  num = [1,2,3];
  state: string;
  test: boolean;
  ngOnInit() {}

  endAnimate(eddd: any) {
    console.log(eddd);
  }

  sum(...n: [number]): any {
    let total: number;
    this.num.reduce((acc: number,curr: number) => {
      return total = acc + curr
    })
  }
}



class User {
  firstName: string;
  secondName: string;
  age: number;
}