import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, Observer } from 'rxjs';

@Component({
  selector: 'app-observable-test',
  templateUrl: './observable-test.component.html',
  styleUrls: ['./observable-test.component.css']
})
export class ObservableTestComponent implements OnInit {
  observable: Observable<string>;
  observer: Observer<string>;
  subscription: Subscription;
  
  data: Observable<number>;
  values: Array<number> = [];
  rndNumber: number;
  constructor() { }

  ngOnInit() {
    //this.streamValues(2000);
    this.observable = new Observable((observer: Observer<string>) => {
      this.observer = observer;
    });

    this.observable.subscribe(this.handleData, this.handleError , this.handleComplete);
    this.observer.next('12');
    this.observer.next('15');
    this.observer.complete();
    this.observer.next('16');
  }

  randomGenerator() {
    this.rndNumber = this.randomInt(-5,13);
  }

  randomInt(min: number, max: number): number {
    let rnd: number = Math.random() * (max - min) + min;
    return parseFloat(rnd.toFixed(2));
  }

  streamValues(delay: number) {
    let d: number;
    d = this.randomInt(3000,5000);
    setTimeout(() => {
      let date = new Date();
      let time: string = date.toLocaleTimeString();
      console.log(time);
      this.rndNumber = this.randomInt(0,1);
      this.streamValues(d);
    }, delay);
  }

  handleData(data) {
    console.log('Here are the usable data', data);
    // Insert Business logic here
  }

  handleComplete() {
    console.log('Complete');
  }

  handleError(error) {
    console.log('error:', error)
    return Observable.throw(error);
  }
}
