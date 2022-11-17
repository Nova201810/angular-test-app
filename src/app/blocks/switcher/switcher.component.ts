import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css'],
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