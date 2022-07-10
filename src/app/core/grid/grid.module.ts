import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GridComponent } from './grid.component';

@NgModule({
	imports: [CommonModule],
	exports: [GridComponent],
	declarations: [GridComponent],
	providers: [],
})
export class GridModule {}
