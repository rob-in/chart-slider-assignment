import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { HomeService } from './home.service';

describe('HomeService', () => {
  let homeService: HomeService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [HttpCacheService, HomeService]
    });
  }));

  beforeEach(inject(
    [HttpCacheService, HomeService, HttpTestingController],
    (
      htttpCacheService: HttpCacheService,
      _homeService: HomeService,
      _httpMock: HttpTestingController
    ) => {
      homeService = _homeService;
      httpMock = _httpMock;

      htttpCacheService.cleanCache();
    }
  ));

  afterEach(() => {
    httpMock.verify();
  });

  describe('generateChartData', () => {

    describe('should format raw chart data into Bar Chart Format', () => {

      it('if not activity selection present by default all bars will be active', () => {
        // Arrange
        const rawData = [10, 20, 30, 40];
        const formattedChartDataShouldBe = [
          ['Activity 1', 10, false],
          ['Activity 2', 20, false],
          ['Activity 3', 30, false],
          ['Activity 4', 40, false]
        ];

        // Act
        const barChartData = homeService.generateChartData(rawData);

        // Assert
        expect(barChartData).toEqual(formattedChartDataShouldBe);
      });

      it('if activity selection is present only selected activity bars will be active', () => {
        // Arrange
        const rawData = [10, 20, 30, 40];
        const activitySelection = [1, 3];
        const formattedChartDataShouldBe = [
          ['Activity 1', 10, true],
          ['Activity 2', 20, true],
          ['Activity 3', 30, true],
          ['Activity 4', 40, false]
        ];

        // Act
        const barChartData = homeService.generateChartData(rawData, activitySelection);

        // Assert
        expect(barChartData).toEqual(formattedChartDataShouldBe);
      });
    });
  });
});
