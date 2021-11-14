import { IForecast, IForecastState } from './forecast.state';
import { createSelector } from '@ngrx/store';

export const selectForecast = (state: IForecastState) => state.forecast;

export const selectAllForecasts = createSelector(
	selectForecast,
	(state: IForecast) => state,
);
