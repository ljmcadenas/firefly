import { NgModule } from '@angular/core';
import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food.component';

@NgModule({
    imports: [FoodRoutingModule],
    declarations: [FoodComponent],
})
export class FoodModule { }
