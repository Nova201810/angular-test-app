import { Input, Component } from '@angular/core';

@Component({
  selector: 'app-header-link',
  template: require('./header-link.component.html'),
  styles: [require('./header-link.component.css')]
})
export class HeaderLinkComponent {
  @Input() link: string = '';
}
