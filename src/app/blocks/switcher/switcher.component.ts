import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switcher',
  template: require('./switcher.component.html'),
  styles: [require('./switcher.component.css')],
})
export class SwitcherComponent {
  @Input() selected!: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor() {}

  onClick() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}