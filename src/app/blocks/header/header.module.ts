import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { HeaderLinkComponent } from './header-link/header-link.component';

const blocks = [
  HeaderComponent,
  HeaderLinkComponent,
];

@NgModule({
  imports: [RouterModule],
  declarations: blocks,
  exports: blocks,
})
export class HeaderModule { }
