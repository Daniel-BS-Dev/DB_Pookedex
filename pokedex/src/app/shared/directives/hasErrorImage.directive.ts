import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHasErrorImage]'
})
export class HasErrorImageDirective {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    const imgElement: HTMLImageElement = this.elementRef.nativeElement;
   
    imgElement.onerror = () => {
      imgElement.src = '../../../assets/images/pokeball.svg';
    };
  }
}
