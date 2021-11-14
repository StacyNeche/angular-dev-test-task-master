import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import { IForecastSearch } from '../models/forecast-search.interface';
import { ForecastMode } from '../models/forecast-mode.enum';
import { NgForm } from '@angular/forms';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
	selector: 'bp-forecast-search',
	templateUrl: './forecast-search.component.html',
	styleUrls: ['./forecast-search.component.scss'],
})
export class ForecastSearchComponent implements OnChanges, AfterViewInit, OnDestroy {

	@Input()
	public default?: IForecastSearch;

	@Output()
	public search: EventEmitter<IForecastSearch> = new EventEmitter<IForecastSearch>();

	public forecastSearch: IForecastSearch = {
		search: '',
		mode: ForecastMode.DAILY,
	};

	@ViewChild('weatherForm')
	private _weatherForm?: NgForm;

	private _destroyed: Subject<void> = new Subject<void>();

	public ngOnChanges(): void {
		if (this.forecastSearch.search !== this.default?.search || this.forecastSearch.mode !== this.default.mode) {
			this.forecastSearch = this.default ?? {
				search: '',
				mode: ForecastMode.DAILY,
			};
			this._weatherForm?.form.setValue(this.forecastSearch, { emitEvent: false });
		}
	}

	public ngAfterViewInit(): void {
		this._weatherForm?.form?.valueChanges
			.pipe(
				filter((forecastSearch: IForecastSearch): boolean => !!forecastSearch.search),
				debounceTime(500),
				takeUntil(this._destroyed),
			).subscribe((forecastSearch: IForecastSearch) => this.search.next(forecastSearch));
	}

	public ngOnDestroy(): void {
		this._destroyed.next();
	}
}
