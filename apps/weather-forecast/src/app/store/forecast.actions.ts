import { createAction, props } from '@ngrx/store';
import { ITemperatureMeasure } from './forecast.state';

export const addHourlyForecast =  createAction('[Weather forecast] add hourly', props<{forecast: IAddForecastActionParam}>());
export const addDailyForecast =  createAction('[Weather forecast] add daily',  props<{forecast: IAddForecastActionParam}>());

export interface IAddForecastActionParam {
	city: string,
	temperatureMeasures: ITemperatureMeasure[]
}
