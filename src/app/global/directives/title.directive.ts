import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTitle]'
})
export class TitleStyleDirective{
    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ){
        this.renderer.addClass(this.element.nativeElement, 'title');
    }
}