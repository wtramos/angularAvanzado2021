import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFakefor]'
})
export class FakeforDirective {

  @Input()
  set appFakefor(iterative: number){
    console.log(`La iterative es: ${iterative}`);
    this.renderElement(iterative);
  }

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  private renderElement(iterative: number): void {
    for (let i = 0; i < iterative; i++){
      this.viewContainer.createEmbeddedView(this.template);
    }
  }
}