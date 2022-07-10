import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridModule } from '../core/grid/grid.module';
import { KpiWidgetModule } from '../core/kpi-widget/kpi-widget.module';
import { TabGroupModule } from '../core/tabs/tab-group.module';
import { KpiFrequencyValueDescriptionPipe } from './kpi-frequency-value-description.pipe';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';

@NgModule({
	imports: [
		CommonModule,
		OverviewRoutingModule,
		KpiWidgetModule,
		GridModule,
		TabGroupModule,
	],
	declarations: [OverviewComponent, KpiFrequencyValueDescriptionPipe],
})
export class OverviewModule {}
