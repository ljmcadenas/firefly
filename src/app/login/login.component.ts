import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'firefly-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}