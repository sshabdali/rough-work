import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[host-modal]',
})
export class HostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
