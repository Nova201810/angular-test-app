import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { components, modules } from './blocks';
import services from './services';
import directives from './directives';
import pages from './pages';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ...modules,
  ],
  providers: [...services],
  declarations: [AppComponent, ...components, ...directives, ...pages],
  bootstrap: [AppComponent]
})
export class AppModule { }
