import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, differenceInMonths } from 'date-fns';
import { Kpi } from '../core/kpi-widget/models/kpi.interface';

@Pipe({
	name: 'kpiFrequencyValueDescription',
})
export class KpiFrequencyValueDescriptionPipe implements PipeTransform {
	transform(value: Kpi, frequency: 'days' | 'months'): string {
		let diff: number;

		switch (frequency) {
			case 'months':
				diff = differenceInMonths(
					value.current.time,
					value.previous.time
				);
				break;

			default:
				diff = differenceInDays(
					value.current.time,
					value.previous.time
				);
				break;
		}

		return `last ${diff} ${frequency}`;
	}
}
