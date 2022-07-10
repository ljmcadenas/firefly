import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MockServerInterceptor } from 'src/mocks/mock-server.interceptor';

import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';

const devProviders: Provider[] = [
	{
		provide: HTTP_INTERCEPTORS,
		multi: true,
		useClass: MockServerInterceptor,
	},
];

@NgModule({
	imports: [BrowserModule, HttpClientModule, RootRoutingModule],
	declarations: [RootComponent],
	bootstrap: [RootComponent],
	providers: !environment.production ? devProviders : [],
})
export class RootModule {}
