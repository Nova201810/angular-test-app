import { Directive, ElementRef, Input, Renderer2, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[custom-field]',
  host: {
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
})
export class FieldDirective implements OnInit, OnChanges {
  @Input() error = false;

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}

  updateStylesOnError() {
    if (this.error) {
      this.setStyles({
        'border': `1px solid var(--color-red-dark)`,
      });
    } else {
      this.setStyles({
        'border': `1px solid var(--color-gray-30)`,
      });
      this.renderer.setStyle
    }
  }

  ngOnInit(): void {
    this.setStyles({
      'border-radius': '4px',
      'font-size': '16px',
      'line-height': `20px`,
      'font-family': `'Open Sans', sans-serif`,
      'outline': 'none',
      'padding': `10px`,
    });
    this.updateStylesOnError();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.error = changes['error'].currentValue;
    this.updateStylesOnError();
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

  onFocus() {
    this.setStyles({
      'outline': 'none',
      'box-shadow': 'var(--box-shadow-outline)',
    });
  }

  onBlur() {
    this.setStyles({
      'box-shadow': 'none',
    });
  }
}