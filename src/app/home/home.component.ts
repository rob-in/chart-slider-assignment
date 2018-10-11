import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './../app.state';
import * as HomeActions from '../core/store/actions/home/home.action';
import * as HomeReducers from '../core/store/reducers/home/home.reducers';
import { SliderConfig } from '@app/shared/silder/slider.model';
import { HomeService } from './home.service';
import { HOME_CONFIG } from './home.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public chartData: Array<any>;
  public sliderConfig: SliderConfig;
  public activeActivityRange: Array<number> = [];
  public dataFromAPI: Array<number> = [];

  private _home$: Observable<any>;
  private _config = HOME_CONFIG;

  constructor(
    private _homeService: HomeService,
    private _store: Store<AppState>
  ) {
    this._readChartDataFromStore();
    this._readActivitiesSelectionDataFromStore();
  }

  ngOnInit() {
    this.dataFromAPI = [84, 14, 234, 37, 64, 42, 197, 11]; // In real time scenario this data will come from API.
    if (!this.activeActivityRange.length) {
      this.activeActivityRange = [1, this.dataFromAPI.length];
    }
    // By default all the activites are slected and slider will show whole range selected

    this.dataFromAPI.sort((a, b) => b - a); // For descending sort
    this._store.dispatch(new HomeActions.AddChartData(this.dataFromAPI));
    this._getSliderConfig();
  }

  onSliderSelectionChange(event: Array<number>) {
    this.activeActivityRange = event;
    this._store.dispatch(
      new HomeActions.AddActivitySelection(this.activeActivityRange)
    );
  }

  private _generateChartData() {
    this.chartData = this._homeService.generateChartData(
      this.dataFromAPI,
      this.activeActivityRange
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
          max: this.dataFromAPI.length
        },
        selectionRange: this.activeActivityRange
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
        this.dataFromAPI = chartData;
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
        this.activeActivityRange = activitiesSelectionData;
        this._generateChartData();
      }
    });
  }
}
