import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'firefly-music',
    templateUrl: 'music.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MusicComponent  {}