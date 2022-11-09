import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[custom-button]',
  host: {
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
})
export class ButtonDirective implements OnInit {
  @Input() kind: 'primary' | 'secondary' | 'borderless' = 'primary';
  @Input() vertSize: 32 | 40 | 48 | 56 = 32;
  private lineHeight = 20;
  private borderWidth = 2;

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'type', 'button');

    this.setStyles({
      'border-radius': '4px',
      'font-size': '16px',
      'line-height': `${this.lineHeight}px`,
      'font-family': `'Open Sans', sans-serif`,
      'border-width': `${this.borderWidth}px`,
      'border-style': 'solid',
      'outline': 'none',
    });
    
    if (this.kind !== 'borderless') {
      const padding = (this.vertSize - this.lineHeight) / 2;
      this.setStyles({
        'padding': `${padding - this.borderWidth}px ${padding}px`
      });
    }

    if (this.kind === 'primary') {
      this.setStyles({
        'border-color': 'var(--color-gray-30)',
        'background': 'var(--color-blue-dark)',
        'color': 'var(--color-white)',
      });
    }

    if (this.kind === 'secondary') {
      this.setStyles({
        'border-color': 'var(--color-blue-dark)',
        'background': 'var(--color-white)',
        'color': 'var(--color-blue-dark)',
      });
    }

    if (this.kind === 'borderless') {
      this.setStyles({
        'border': 'none',
        'background': 'transparent',
        'padding': '0',
      });
    }
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