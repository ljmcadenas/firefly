import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabBodyDirective } from './tab-body.directive';
import { TabControlsDirective } from './tab-controls.directive';
import { TabFooterDirective } from './tab-footer.directive';

import { TabGroupComponent } from './tab-group.component';
import { TabTitleDirective } from './tab-title.directive';
import { TabModule } from './tab/tab.module';

@NgModule({
	imports: [CommonModule],
	exports: [
		TabGroupComponent,
		TabFooterDirective,
		TabControlsDirective,
		TabBodyDirective,
		TabTitleDirective,
		TabModule,
	],
	declarations: [
		TabGroupComponent,
		TabFooterDirective,
		TabBodyDirective,
		TabTitleDirective,
		TabControlsDirective,
	],
})
export class TabGroupModule {}
