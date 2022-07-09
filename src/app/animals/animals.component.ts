import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'firefly-animals',
    templateUrl: 'animals.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AnimalsComponent  {}