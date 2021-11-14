import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ForecastSearchComponent } from './forecast-search/forecast-search.component';
import { ForecastWidgetComponent } from './forecast-widget/forecast-widget.component';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { forecastReducer } from './store/forecast.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IForecastState } from './store/forecast.state';
import { ForecastTableComponent } from './forecast-table/forecast-table.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [AppComponent, ForecastSearchComponent, ForecastWidgetComponent, ForecastTableComponent],
	imports: [BrowserModule, CommonModule, WeatherForecastServicesModule, FormsModule, RouterModule.forRoot([]),
											StoreModule.forRoot<IForecastState>({forecast: forecastReducer}), StoreDevtoolsModule.instrument({
												maxAge: 25
											})],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
