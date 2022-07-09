import { NgModule } from '@angular/core';
import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalsComponent } from './animals.component';

@NgModule({
    imports: [AnimalsRoutingModule],
    declarations: [AnimalsComponent],
})
export class AnimalsModule { }
