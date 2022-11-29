import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';

import { FOCUSABLE_ELEMENTS_SELECTOR } from '../../constants/common';

@Component({
  selector: 'app-modal',
  template: require('./modal.component.html'),
  styles: [require('./modal.component.css')],
})
export class ModalComponent implements OnInit {
  @Input() heading: string = '';
  @Output() onHide = new EventEmitter();

  constructor(private modalRef: ElementRef) {}

  ngOnInit(): void {
    const modalElement = this.modalRef.nativeElement;
    const focusableElements = modalElement.querySelectorAll(`${FOCUSABLE_ELEMENTS_SELECTOR} `);
    const firstFocusableElement = focusableElements[0];
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }

  hide() {
    this.onHide.emit();
  }
}
