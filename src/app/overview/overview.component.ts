import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'firefly-overview',
    templateUrl: 'overview.component.html',
    styleUrls: ['overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class OverviewComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}