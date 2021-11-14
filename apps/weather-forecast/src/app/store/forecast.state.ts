export interface IForecastState  {
	forecast: IForecast
}

export interface IForecast {
	hourly: ICityForecast[];
	daily: ICityForecast[];
}

export interface ICityForecast {
	city: string;
	temperatureMeasures: ITemperatureMeasure[]
}

export interface ITemperatureMeasure {
	timestamp: number,
	temperature: number;
}

export const initialState: IForecastState = {
	forecast: {hourly: [], daily: []}
};
