import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { ICoordinates } from './models/coordinates.interface';
import { map } from 'rxjs/operators';
import { IForecastResponse } from './models/forecast-response.interface';
import { IHourlyForecast } from './models/hourly-forecast.interface';
import { ForecastMapper } from './models/forecast-mapper.class';
import { IDailyForecast } from './models/daily-forecast.interface';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {

	private _apiKey = '010721642521f31b0fbc8c3831d45951';

	private _cityCoordinatesUrl = 'http://api.openweathermap.org/geo/1.0/direct';

	private _weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';

	constructor(private readonly _httpClient: HttpClient, private readonly forecastMapper: ForecastMapper) {
	}

	public getWeatherHourly$(cityName: string): Observable<IForecastResponse> {
		return this._getCityCoordinates$(cityName)
			.pipe(switchMap((coordinates: ICoordinates) => this._httpClient.get<IHourlyForecast>(this._weatherUrl, { params: this._getWeatherParams(coordinates, 'current,minutely,daily,alerts') })),
									map(data => this.forecastMapper.mapHourlyForecast(data, cityName)));
	}

	public getWeatherDaily$(cityName: string): Observable<IForecastResponse> {
		return this._getCityCoordinates$(cityName)
			.pipe(switchMap((coordinates: ICoordinates) => this._httpClient.get<IDailyForecast>(this._weatherUrl, { params: this._getWeatherParams(coordinates, 'current,minutely,hourly,alerts') })),
									map(data => this.forecastMapper.mapDailyForecast(data, cityName)));
	}

	private _getCityCoordinates$(cityName: string): Observable<ICoordinates> {
		return this._httpClient.get<ICoordinates[]>(this._cityCoordinatesUrl, { params: this._getCityCoordinatesParams(cityName) })
			.pipe(map((coordinates: ICoordinates[]) => coordinates[0]));
	}

	private _getCityCoordinatesParams(cityName: string): HttpParams {
		return this._getHttpParamsWithApiKey()
			.set('q', cityName)
			.set('limit', 1);
	}

	private _getWeatherParams(coordinates: ICoordinates, exclude: string): HttpParams {
		return this._getHttpParamsWithApiKey()
			.set('lat', coordinates.lat)
			.set('lon', coordinates.lon)
			.set('exclude', exclude);
	}

	private _getHttpParamsWithApiKey(): HttpParams {
		return new HttpParams()
			.set('appid', this._apiKey);
	}
}
