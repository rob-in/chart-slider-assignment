import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`
};

export interface RandomQuoteContext {
  // The quote's category: 'dev', 'explicit'...
  category: string;
}

@Injectable()
export class QuoteService {

  constructor(private httpClient: HttpClient) { }

  getRandomQuote(context: RandomQuoteContext): Observable<string> {
    return this.httpClient
      .cache()
      .get(routes.quote(context))
      .pipe(
        map((body: any) => body.value),
        catchError(() => of('Error, could not load joke :-('))
      );
  }

  generateChartData(dataObj: Array<number>, activeActivityRange: Array<number>): any {
    const _chartData: any = [];
    dataObj.forEach((dataValue, i) => {
      _chartData.push([
        `Activity ${i + 1}`,
        dataValue,
        ((i + 1) >= activeActivityRange[0] && (i + 1) <= activeActivityRange[1])
      ]);
    });
    return _chartData;
  }

}
