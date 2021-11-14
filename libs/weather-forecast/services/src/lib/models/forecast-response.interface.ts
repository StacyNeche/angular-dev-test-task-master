export interface IForecastResponse {
	city: string;
	temperatureMeasures: ITemperatureMeasure[];
}

export interface ITemperatureMeasure {
	timestamp: number,
	temperature: number;
}
