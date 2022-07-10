import { QueryList } from '@angular/core';
import { TabFooterDirective } from './tab-footer.directive';
import { TabComponent } from './tab/tab.component';

export abstract class TabGroupToken {
	public abstract footer?: TabFooterDirective;
	public abstract tabsQueryList: QueryList<TabComponent>;
	public abstract tabs: TabComponent[];
	public abstract activeTab: TabComponent;
}
