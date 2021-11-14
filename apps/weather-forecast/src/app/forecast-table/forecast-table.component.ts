import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ICityForecast, IForecast, IForecastState } from '../store/forecast.state';
import { select, Store } from '@ngrx/store';
import { selectAllForecasts } from '../store/forecast.selector';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ForecastMode } from '../models/forecast-mode.enum';

@Component({
	selector: 'bp-forecast-table',
	templateUrl: './forecast-table.component.html',
	styleUrls: ['./forecast-table.component.scss'],
})
export class ForecastTableComponent implements OnChanges, OnInit, OnDestroy {

	@Input()
	public mode?: ForecastMode;

	public forecastToDisplay?: ICityForecast [];

	private _destroyed$: Subject<void> = new Subject<void>();

 	private _forecast?: IForecast;

	constructor(private readonly _store: Store<IForecastState>) {
	}

	public ngOnChanges(): void {
		this._updateForecastToDisplay();
	}

	public ngOnInit(): void {
		this._subscribeOnForecastUpdate();
	}

	public ngOnDestroy(): void {
		this._destroyed$.next();
	}

	public trackByForecast(index: number, item : ICityForecast): string {
		return item.city;
	}

	private _subscribeOnForecastUpdate(): void {
		this._store.pipe(
			select(selectAllForecasts),
			takeUntil(this._destroyed$))
			.subscribe((forecast) => {
				this._forecast = forecast;
				this._updateForecastToDisplay();
			});
	}

	private _updateForecastToDisplay(): void {
		this.forecastToDisplay = this.mode === ForecastMode.DAILY ? this._forecast?.daily : this._forecast?.hourly;
	}
}
