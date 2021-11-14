import { ForecastMode } from './forecast-mode.enum';

export interface IForecastSearch {
	search: string;
	mode: ForecastMode;
}
