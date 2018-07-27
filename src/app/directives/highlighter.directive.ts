import {Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[textHighlighter]'
})
export class HighlighterDirective {

  constructor (private el: ElementRef) {    
  }

  @HostListener('mouseenter') onMouseHover() {
    this.highlight('yellow');
  }
 
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
 
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }


}
