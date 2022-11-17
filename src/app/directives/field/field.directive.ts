import { Directive, ElementRef, Input, Renderer2, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[custom-field]',
  host: {
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
})
export class FieldDirective implements OnInit, OnChanges {
  @Input() vertSize: 32 | 40 | 48 | 56 = 32;
  @Input() error?: boolean = false;
  private lineHeight = 20;
  private borderWidth = 1;

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}

  updateStylesOnError() {
    if (this.error) {
      this.setStyles({
        'border': `${this.borderWidth}px solid var(--color-red-dark)`,
      });
    } else {
      this.setStyles({
        'border': `${this.borderWidth}px solid var(--color-gray-30)`,
      });
    }
  }

  ngOnInit(): void {
    this.setStyles({
      'border-radius': '4px',
      'font-size': '16px',
      'line-height': `${this.lineHeight}px`,
      'font-family': `'Open Sans', sans-serif`,
      'outline': 'none',
      'padding': `${(this.vertSize - this.lineHeight) / 2 - this.borderWidth}px 8px`,
    });
    this.updateStylesOnError();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.error = changes['error']?.currentValue;
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