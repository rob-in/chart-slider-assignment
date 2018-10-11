import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  chartData: () => '/chartData'
};

@Injectable()
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  // TODO: We can use MOCK API call to fetch chart data instead of hardcoding in component

  // getChartDataFromAPI(): Observable<string> {
  //   return this.httpClient
  //     .cache()
  //     .get(routes.chartData())
  //     .pipe(
  //       map((body: any) => body.value),
  //       catchError(() => of('Error, could not load chartData :-('))
  //     );
  // }

  generateChartData(
    dataObj: Array<number>,
    activeActivityRange?: Array<number>
  ): any {
    const _chartData: any = [];
    dataObj.forEach((dataValue, i) => {

      const activityState: boolean = activeActivityRange
        ? i + 1 >= activeActivityRange[0] && i + 1 <= activeActivityRange[1]
        : false; // if there are not activity selection present by default all the activities will be active

      _chartData.push([
        `Activity ${i + 1}`,
        dataValue,
        activityState
      ]);
    });
    return _chartData;
  }
}
