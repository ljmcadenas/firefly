import {
	Component,
	ContentChild,
	Input,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { TabBodyDirective } from '../tab-body.directive';
import { TabControlsDirective } from '../tab-controls.directive';
import { TabGroupToken } from '../tab-group.token';
import { TabTitleDirective } from '../tab-title.directive';

@Component({
	selector: 'firefly-tab',
	template:
		'<ng-template><ng-container *ngIf="isActive"><ng-content></ng-content></ng-container></ng-template>',
})
export class TabComponent {
	@Input()
	public active: boolean = false;

	@Input()
	public title: string = '';

	@ViewChild(TemplateRef, { static: true })
	public implicitContent!: TemplateRef<any>;

	@ContentChild(TabBodyDirective, { read: TemplateRef, static: true })
	public explicitContent?: TemplateRef<any>;

	@ContentChild(TabControlsDirective, { read: TemplateRef, static: true })
	public controls?: TemplateRef<any>;

	@ContentChild(TabTitleDirective, { read: TemplateRef, static: true })
	public titleTemplate?: TemplateRef<any>;

	public get isActive() {
		return this.active || this.parent.activeTab === this;
	}

	public content!: TemplateRef<any>;

	constructor(private parent: TabGroupToken) {}

	public ngOnInit(): void {
		this.content = this.explicitContent || this.implicitContent;
	}
}
