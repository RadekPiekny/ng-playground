import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, Observer } from 'rxjs';

@Component({
  selector: 'app-observable-test',
  templateUrl: './observable-test.component.html',
  styleUrls: ['./observable-test.component.css']
})
export class ObservableTestComponent implements OnInit {
  observable: Observable<string>;
  observer: Observer<number>;
  subscription: Subscription;
  
  data: Observable<number>;
  values: Array<number> = [];
  rndNumber: number;
  rndNumberWatch: Observable<number>;
  constructor() { }

  ngOnInit() {
    this.streamValues(2000);
    this.rndNumberWatch = new Observable((observer: Observer<number>) => {
      setTimeout(() => {
        observer.next(8);
      }, 8000);
      setTimeout(() => {
        observer.next(3);
      }, 3000);
    });

    this.subscription = this.rndNumberWatch.subscribe(
      data => console.log('new value emited: ' + data),
      e => console.log('something is wrong' + e),
      () => console.log('it is finished')
    );
  }

  randomGenerator() {
    this.rndNumber = this.randomInt(-5,13);
  }

  randomInt(min: number, max: number): number {
    let rnd: number = Math.random() * (max - min) + min;
    return parseFloat(rnd.toFixed(2));
  }

  streamValues(delay: number): number {
    let d: number;
    d = this.randomInt(3000,5000);
    setTimeout(() => {
      let date = new Date();
      let time: string = date.toLocaleTimeString();
      console.log(time);
      this.rndNumber = this.randomInt(0,1);
      this.streamValues(d);
    }, delay);
    return this.rndNumber;
  }
}
