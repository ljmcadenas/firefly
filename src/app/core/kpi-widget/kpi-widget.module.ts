import { NgModule } from '@angular/core';
import { KpiWidgetValueDirective } from './kpi-widget-value.directive';

import { KpiWidgetComponent } from './kpi-widget.component';

@NgModule({
	imports: [],
	exports: [KpiWidgetComponent, KpiWidgetValueDirective],
	declarations: [KpiWidgetComponent, KpiWidgetValueDirective],
})
export class KpiWidgetModule {}
