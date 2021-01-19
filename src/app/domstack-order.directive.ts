import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appDOMStackOrder]',
})
export class DOMStackOrderDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const parent = this.el.nativeElement.parentNode;
    const children = parent.children;
    [...children].forEach((child) =>
      child.addEventListener('mouseenter', (ev: MouseEvent) => {
        parent.appendChild(ev.target);
      })
    );
  }
}
