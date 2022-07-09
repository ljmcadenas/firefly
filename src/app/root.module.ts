import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';


@NgModule({
    imports: [BrowserModule, RootRoutingModule],
    declarations: [RootComponent],
    bootstrap: [RootComponent]
})
export class RootModule { }
