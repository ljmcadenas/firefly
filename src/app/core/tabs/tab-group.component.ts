import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ContentChildren,
	OnDestroy,
	QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabFooterDirective } from './tab-footer.directive';
import { TabGroupToken } from './tab-group.token';
import { TabComponent } from './tab/tab.component';

@Component({
	selector: 'firefly-tab-group',
	templateUrl: 'tab-group.component.html',
	styleUrls: ['tab-group.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: TabGroupToken,
			useExisting: TabGroupComponent,
		},
	],
})
export class TabGroupComponent
	extends TabGroupToken
	implements AfterContentInit, OnDestroy
{
	@ContentChild(TabFooterDirective)
	public footer?: TabFooterDirective;

	@ContentChildren(TabComponent)
	public tabsQueryList!: QueryList<TabComponent>;

	public tabs: TabComponent[] = [];
	public activeTab!: TabComponent;

	private destroyed$ = new Subject<void>();

	public ngAfterContentInit() {
		if (this.tabsQueryList.length) {
			this.loadTemplateTabs();
		}

		this.tabsQueryList.changes
			.pipe(takeUntil(this.destroyed$))
			.subscribe(() => {
				this.loadTemplateTabs();
			});
	}

	public ngOnDestroy(): void {
		this.destroyed$.next();
	}

	public trackTabBy(i: number): number {
		return i;
	}

	public onTabTitleClicked(tab: TabComponent): void {
		if (this.activeTab !== tab) {
			this.activateTab(tab);
		}
	}

	private loadTemplateTabs(): void {
		this.tabs = this.tabsQueryList.toArray() ?? [];
		this.activeTab = this.tabs.find((tab) => tab.active) || this.tabs[0];
	}

	private activateTab(selectedTab: TabComponent): void {
		this.activeTab = selectedTab;
		this.tabs.forEach((tab) => (tab.active = tab === selectedTab));
	}
}
