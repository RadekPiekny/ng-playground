import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css']
})
export class RangeSliderComponent implements OnInit {
  subscription: Subscription[] = [];
  thumbGrapPosition: number;
  trackContainerLeft: number;
  trackContainerWidth: number;
  active: boolean = false;
  @ViewChild('thumbMinEl', { static: true }) thumbMinEl: ElementRef<HTMLDivElement>;
  @ViewChild('thumbMaxEl', { static: true }) thumbMaxEl: ElementRef<HTMLDivElement>;
  @ViewChild('track', { static: true }) track: ElementRef<HTMLDivElement>;
  @ViewChild('trackContainerEl', { static: true }) trackContainerEl: ElementRef<HTMLDivElement>;
  thumbMin: Thumb = new Thumb;
  thumbMax: Thumb = new Thumb;

  constructor() { }

  ngOnInit() {
    this.subscription.push(
      fromEvent(this.thumbMinEl.nativeElement, 'mousedown').subscribe(
        (res:MouseEvent) => {
          console.log(res);
          this.active = true;
          this.thumbGrapPosition = res.clientX -  this.thumbMinEl.nativeElement.getBoundingClientRect().left;
          this.getElementParams('min');
        }
      )
    );
    this.subscription.push(
      fromEvent(this.thumbMaxEl.nativeElement, 'mousedown').subscribe(
        (res:MouseEvent)  => {
          console.log(res);
          this.active = true;
          this.thumbGrapPosition = res.clientX - this.thumbMaxEl.nativeElement.getBoundingClientRect().left;
          this.getElementParams('max');
        }
      )
    );
  }

  getElementParams(thumb: string) {
    this.trackContainerLeft = this.trackContainerEl.nativeElement.getBoundingClientRect().left;
    this.trackContainerWidth = this.trackContainerEl.nativeElement.getBoundingClientRect().width;
    if (thumb === 'min') {
      this.thumbMin.active = true;
      this.thumbMax.active = false;
    } else {
      this.thumbMax.active = true;
      this.thumbMin.active = false;
    }
    this.thumbMin.left = this.thumbMinEl.nativeElement.getBoundingClientRect().left - this.trackContainerLeft;
    this.thumbMin.width = this.thumbMinEl.nativeElement.getBoundingClientRect().width;
    this.thumbMin.top = this.thumbMinEl.nativeElement.getBoundingClientRect().top;

    this.thumbMax.left = this.thumbMaxEl.nativeElement.getBoundingClientRect().left - this.trackContainerLeft;
    this.thumbMax.width = this.thumbMaxEl.nativeElement.getBoundingClientRect().width;
    this.thumbMax.top = this.thumbMaxEl.nativeElement.getBoundingClientRect().top;
  }

  deactivate() {
    this.active = false;
    this.thumbMax.active = false;
    this.thumbMin.active = false;
  }

  valueChange(e: MouseEvent) {
    if (this.thumbMin.active) {
      this.thumbMinSliding(e.clientX);
    }
    if (this.thumbMax.active) {
      this.thumbMaxSliding(e.clientX);
    }
  }

  thumbMinSliding(clientX: number) {
    if (clientX < this.trackContainerLeft) {
      return;
    }
    if (clientX > this.thumbMax.left) {
      return;
    }
    this.thumbMin.left = clientX;
  }

  thumbMaxSliding(clientX: number) {
    if (clientX - this.trackContainerLeft - this.thumbGrapPosition > this.trackContainerWidth - this.thumbMax.width) {
      this.thumbMax.left = this.trackContainerWidth - this.thumbMax.width;
      return;
    }
    if (clientX - this.trackContainerLeft - this.thumbGrapPosition< this.thumbMin.left) {
      this.thumbMax.left = this.thumbMin.left;
      return;
    }
    this.thumbMax.left = clientX - this.trackContainerLeft - this.thumbGrapPosition;
  }

  getThumbMaxStyle(): Object {
    return {
      'transform': 'translateX(' + this.thumbMax.left + 'px)'
    };
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s => {
      s.unsubscribe;
    })  
  }

}

class Thumb {
  top: number;
  left: number;
  width: number;
  active: boolean;
}