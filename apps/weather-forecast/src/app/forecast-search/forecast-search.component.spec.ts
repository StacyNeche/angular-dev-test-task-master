import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastSearchComponent } from './forecast-search.component';

describe('ForecastSearchComponent', () => {
	let component: ForecastSearchComponent;
	let fixture: ComponentFixture<ForecastSearchComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ForecastSearchComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ForecastSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
