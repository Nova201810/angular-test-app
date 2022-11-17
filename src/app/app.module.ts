import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { components, modules } from './blocks';
import services from './services';
import directives from './directives';
import pages from './pages';
import pipes from './pipes';
import interceptors from './interceptors';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ...modules,
  ],
  providers: [...services, ...interceptors],
  declarations: [AppComponent, ...directives, ...pipes, ...components, ...pages],
  bootstrap: [AppComponent]
})
export class AppModule { }
