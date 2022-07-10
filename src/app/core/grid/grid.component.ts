import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { GridColDef } from './models/grid-col-def.interface';
import { GridData } from './models/grid-data.interface';

@Component({
	selector: 'firefly-grid',
	templateUrl: 'grid.component.html',
	styleUrls: ['grid.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
	@Input()
	public colDef!: GridColDef[];

	@Input()
	public data!: GridData[];

	constructor() {}

	ngOnInit() {}

	public trackColsBy(_i: number, colDef: GridColDef): string {
		return colDef.label;
	}

	public trackDataBy(_i: number, row: GridData): string {
		return row.id;
	}

	// TODO: ideally this method should live on the consumer side
	public removeRow(): void {
		// TODO: show modal confirmation
	}

	// TODO: ideally this method should live on the consumer side
	public shareRow(): void {
		// TODO: show modal confirmation
	}
}
