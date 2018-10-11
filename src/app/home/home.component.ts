import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './../app.state';
import * as HomeActions from '../store/actions/home/home.action';
import * as HomeReducers from '../store/reducers/home/home.reducers';
import { SliderConfig } from '@app/shared/silder/slider.model';
import { HomeService } from './home.service';
import { HOME_CONFIG } from './home.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _home$: Observable<any>;
  public chartData: Array<any>;
  public sliderConfig: SliderConfig;
  private _config = HOME_CONFIG;
  private _dataFromAPI: Array<number> = [];
  private _activeActivityRange: Array<number> = [];

  constructor(
    private _homeService: HomeService,
    private _store: Store<AppState>
  ) {
    this._readChartDataFromStore();
    this._readActivitiesSelectionDataFromStore();
  }

  ngOnInit() {
    this._dataFromAPI = [84, 14, 234, 37, 64, 42, 197, 11]; // In real time scenario this data will come from API.
    if (!this._activeActivityRange.length) {
      this._activeActivityRange = [1, this._dataFromAPI.length];
    }
    // By default all the activites are slected and slider will show whole range selected

    this._dataFromAPI.sort((a, b) => b - a); // For descending sort
    this._store.dispatch(new HomeActions.AddChartData(this._dataFromAPI));
    this._getSliderConfig();
  }

  onSliderSelectionChange(event: Array<number>) {
    this._activeActivityRange = event;
    this._store.dispatch(
      new HomeActions.AddActivitySelection(this._activeActivityRange)
    );
  }

  private _generateChartData() {
    this.chartData = this._homeService.generateChartData(
      this._dataFromAPI,
      this._activeActivityRange
    );
  }

  private _getSliderConfig() {
    // set config for slider,
    // range will be from 1 to total no of activities
    // by default whole range will be selected, so setting selectionRange from 1 till length of the array
    this.sliderConfig = Object.assign(
      {
        range: {
          min: 1,
          max: this._dataFromAPI.length
        },
        selectionRange: this._activeActivityRange
      },
      this._config.sliderConfig
    );
  }

  private _readChartDataFromStore() {
    this._home$ = this._store
      .select('home')
      .pipe(select(HomeReducers.getChartData));
    this._home$.subscribe(chartData => {
      if (chartData.length) {
        this._dataFromAPI = chartData;
        this._generateChartData();
      }
    });
  }

  private _readActivitiesSelectionDataFromStore() {
    this._home$ = this._store
      .select('home')
      .pipe(select(HomeReducers.getActivitiesSelectionData));
    this._home$.subscribe(activitiesSelectionData => {
      if (activitiesSelectionData.length) {
        this._activeActivityRange = activitiesSelectionData;
        this._generateChartData();
      }
    });
  }
}
