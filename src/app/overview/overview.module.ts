import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KpiWidgetModule } from '../core/kpi-widget/kpi-widget.module';
import { KpiFrequencyValueDescriptionPipe } from './kpi-frequency-value-description.pipe';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './overview.component';

@NgModule({
	imports: [CommonModule, OverviewRoutingModule, KpiWidgetModule],
	declarations: [OverviewComponent, KpiFrequencyValueDescriptionPipe],
})
export class OverviewModule {}
