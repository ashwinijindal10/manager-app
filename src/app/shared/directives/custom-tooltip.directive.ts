import {
  Directive,
  ElementRef,
  Input,
  Host,
  Renderer2,
  AfterViewChecked,
  ViewContainerRef,
  NgZone
} from '@angular/core';

import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { MatTooltip, MatTooltipDefaultOptions } from '@angular/material';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';

const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 100,
  hideDelay: 100,
  touchendHideDelay: 100
};
@Directive({
  selector: '[appCustomTooltip]'
})
export class CustomTooltipDirective extends MatTooltip
  implements AfterViewChecked {
  @Input() public appCustomTooltip: string;
  constructor(
    private renderer: Renderer2,
    public overlay: Overlay,
    private el: ElementRef,
    private scrollDispatcher: ScrollDispatcher,
    private viewContainerRef: ViewContainerRef,
    private ngZone: NgZone,
    private platform: Platform,
    private ariaDescriber: AriaDescriber,
    private focusMonitor: FocusMonitor,
    private dir: Directionality
  ) {
    super(
      overlay,
      el,
      scrollDispatcher,
      viewContainerRef,
      ngZone,
      platform,
      ariaDescriber,
      focusMonitor,
      () => {},
      dir,
      myCustomTooltipDefaults
    );
  }

  ngAfterViewChecked() {
    if (this.el.nativeElement.scrollWidth > this.el.nativeElement.clientWidth) {
      this.disabled = false;
      this.message = this.appCustomTooltip;
    } else {
      this.disabled = true;
    }
  }
}
