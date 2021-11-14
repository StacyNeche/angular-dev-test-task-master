import { Component, OnDestroy, OnInit } from '@angular/core';
import { IForecastSearch } from '../models/forecast-search.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable, Subject, take } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { ForecastMode } from '../models/forecast-mode.enum';
import { Store } from '@ngrx/store';
import { IForecastState } from '../store/forecast.state';
import { IForecastResponse } from '../../../../../libs/weather-forecast/services/src/lib/models/forecast-response.interface';
import { addDailyForecast, addHourlyForecast, IAddForecastActionParam } from '../store/forecast.actions';

@Component({
	selector: 'bp-forecast-widget',
	templateUrl: './forecast-widget.component.html',
	styleUrls: ['./forecast-widget.component.scss'],
})
export class ForecastWidgetComponent implements OnInit, OnDestroy {

	public errorVisible = false;

	public forecastSearch?: IForecastSearch;

	private _destroyed$: Subject<void> = new Subject<void>();

	constructor(private readonly _router: Router, private readonly _activatedRouter: ActivatedRoute,
													private readonly _weatherForecastApiService: WeatherForecastApiService,
													private readonly _store: Store<IForecastState>) {
	}

	public ngOnInit(): void {
		this._subscribeOnRouteParamsChange();
	}

	public ngOnDestroy(): void {
		this._destroyed$.next();
	}

	public updateUrl(forecastSearch: IForecastSearch): void {
		this._toggleError(false);
		this._router.navigate([], {
			queryParams: {
				...forecastSearch,
			},
			queryParamsHandling: 'merge',
		});
	}

	private _subscribeOnRouteParamsChange(): void {
		this._activatedRouter.queryParams
			.pipe(
				filter((params): boolean => !!params.search && !!params.mode),
				takeUntil(this._destroyed$))
			.subscribe(params => this._loadWeatherForecast(params as IForecastSearch));
	}

	private _loadWeatherForecast(forecastSearch: IForecastSearch): void {
		this.forecastSearch = forecastSearch;
		const forecastSource$: Observable<IForecastResponse> = forecastSearch.mode === ForecastMode.DAILY ? this._weatherForecastApiService.getWeatherDaily$(forecastSearch.search)
			: this._weatherForecastApiService.getWeatherHourly$(forecastSearch.search);
		const updateStoreAction = forecastSearch.mode === ForecastMode.DAILY ? addDailyForecast : addHourlyForecast;

		forecastSource$.pipe(
			take(1),
			catchError(() => {
				this._toggleError(true);
				return EMPTY;
			}),
		).subscribe((data) => this._store.dispatch(updateStoreAction({ forecast: data as IAddForecastActionParam })));

	}

	private _toggleError(state: boolean): void {
		this.errorVisible = state;
	}
}
