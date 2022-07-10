import {
	ChangeDetectionStrategy,
	Component,
	HostBinding,
	Input,
} from '@angular/core';

@Component({
	selector: 'firefly-kpi-widget',
	templateUrl: 'kpi-widget.component.html',
	styleUrls: ['kpi-widget.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiWidgetComponent {
	@Input()
	public label!: string;

	@Input()
	public status!: 'danger' | 'success';

	@HostBinding('class.kpi-widget--danger')
	public get isDangerStatus() {
		return this.status === 'danger';
	}

	@HostBinding('class.kpi-widget--success')
	public get isSuccessStatus() {
		return this.status === 'success';
	}
}
