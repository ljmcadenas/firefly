/* xdescribe('AppComponent', () => {
	let bannerService: MessageBannerService;
	let fixture: ComponentFixture<AppComponent>;
	let app: AppComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				SideNavigationComponent,
				OverviewComponent,
				TopMusicComponent,
			],
			providers: [MessageBannerService],
		}).compileComponents();
	});

	beforeEach(() => {
		bannerService = TestBed.inject(MessageBannerService);
		spyOn(bannerService, 'displayBanner');

		fixture = TestBed.createComponent(AppComponent);
		app = fixture.componentInstance;
	});

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});

	it('should call banner service after view init', () => {
		app.ngAfterViewInit();
		expect(bannerService.displayBanner).toHaveBeenCalled();
	});
}); */
