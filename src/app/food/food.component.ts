import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'firefly-food',
    templateUrl: 'food.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FoodComponent  {}