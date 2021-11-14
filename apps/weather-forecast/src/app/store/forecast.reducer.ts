import { createReducer, on } from '@ngrx/store';
import {  initialState } from './forecast.state';
import { addDailyForecast, addHourlyForecast } from './forecast.actions';

export const forecastReducer = createReducer(
	initialState.forecast,
	on(addHourlyForecast, (state, {forecast}) => ({...state, hourly: [...state.hourly, {city: forecast.city, temperatureMeasures: forecast.temperatureMeasures}]})),
	on(addDailyForecast, (state, {forecast}) => ({...state, daily: [...state.daily, {city: forecast.city, temperatureMeasures: forecast.temperatureMeasures}]}))
)
