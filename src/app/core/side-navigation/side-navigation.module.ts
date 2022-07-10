import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SideNavigationComponent } from './side-navigation.component';

@NgModule({
	imports: [CommonModule, RouterModule],
	exports: [SideNavigationComponent],
	declarations: [SideNavigationComponent],
})
export class SideNavigationModule {}
