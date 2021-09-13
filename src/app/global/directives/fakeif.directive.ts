import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFakeif]'
})
export class FakeifDirective {

  @Input()
  set appFakeif(condition: boolean){
    console.log(`La condición es: ${condition}`);
    this.renderElement(condition);
  }
  
  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  private renderElement(condition: boolean): void {
    if (condition){
      this.viewContainer.createEmbeddedView(this.template);
    }
    else {
      this.viewContainer.clear();
    }
  }
}
