import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPathLightning]'
})
export class PathLightningDirective implements OnInit {
  path: SVGPathElement;
  constructor(
    private el: ElementRef
  ) {
    this.path = (this.el.nativeElement as SVGPathElement);
  }

  ngOnInit(): void {
    this.path.setAttribute('d', 'M 10 10 C 20 20, 40 20, 50 10');
  }

}
