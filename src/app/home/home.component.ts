import { Component, OnInit } from '@angular/core';
import { QuoteService } from './quote.service';
import { SliderConfig } from '@app/shared/silder/slider.model';
import { HOME_CONFIG } from './home.config';
import { Observable } from 'rxjs';
import { Home } from './home.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _home: Observable<Home>;

  public chartData: Array<any>;
  public sliderConfig: SliderConfig;
  private _config = HOME_CONFIG;
  private _dataFromAPI: Array<number>;
  private _activeActivityRange: Array<number>;

  constructor( private _quoteService: QuoteService) {
    this._dataFromAPI = [84, 14, 234, 37, 64, 42, 197, 11]; // In real time scenario this data will come from API.
    this._activeActivityRange = [1, this._dataFromAPI.length];
    // By default all the activites are slected and slider will show whole range selected
  }

  ngOnInit() {
    this._dataFromAPI.sort((a, b) => b - a); // For descending sort
    this._generateChartData();
    this._getSliderConfig();
  }

  onSliderSelectionChange(event: Array<number>) {
    this._activeActivityRange = event;
    this._generateChartData();
  }

  private _generateChartData() {
    this.chartData = this._quoteService.generateChartData(this._dataFromAPI, this._activeActivityRange);
  }

  private _getSliderConfig() {
    // set config for slider,
    // range will be from 1 to total no of activities
    // by default whole range will be selected, so setting selectionRange from 1 till length of the array
    this.sliderConfig = Object.assign({
      range: {
        min: 1,
        max: this._dataFromAPI.length
      },
      selectionRange: this._activeActivityRange
    }, this._config.sliderConfig);
  }
}
