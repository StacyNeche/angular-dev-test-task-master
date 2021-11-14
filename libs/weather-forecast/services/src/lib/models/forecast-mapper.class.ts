import { Injectable } from '@angular/core';
import { IHourlyForecast } from './hourly-forecast.interface';
import { IForecastResponse, ITemperatureMeasure } from './forecast-response.interface';
import { IDailyForecast } from './daily-forecast.interface';

@Injectable(
	{ providedIn: 'root' },
)
export class ForecastMapper {

	public mapHourlyForecast(forecast: IHourlyForecast, city: string): IForecastResponse {
		const temperatureMeasures: ITemperatureMeasure[] = [];

		forecast.hourly.forEach((record, index) => {
			if ((index === 0 || (index % 3) === 0) && temperatureMeasures.length < 8) {
				temperatureMeasures.push({ timestamp: record.dt, temperature: record.temp });
			}
		});

		return { city, temperatureMeasures };
	}

	public mapDailyForecast(forecast: IDailyForecast, city: string): IForecastResponse {
		const temperatureMeasures: ITemperatureMeasure[] = [];

		forecast.daily.slice(0, 7).forEach((record) => {
			temperatureMeasures.push({timestamp: record.dt, temperature: record.temp?.day})
		});

		return { city, temperatureMeasures };
	}
}
