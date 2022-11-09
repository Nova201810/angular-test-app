import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[custom-error]',
})
export class ErrorDirective {
  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}

  ngOnInit(): void {
    this.setStyles({
      'font-size': '14px',
      'line-height': `20px`,
      'font-family': `'Open Sans', sans-serif`,
      'color': 'var(--color-red-dark)',
      'font-weight': '600',
      'margin-bottom': '8px',
    });
  }

  private setStyles(styles: Record<string, string>) {
    Object.entries(styles).forEach(([prop, value]) => {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        prop,
        value,
      );
    });
  }
}