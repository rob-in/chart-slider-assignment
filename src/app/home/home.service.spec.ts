import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { HomeService } from './home.service';

describe('HomeService', () => {
  let homeService: HomeService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpCacheService,
        HomeService
      ]
    });
  }));

  beforeEach(inject([
    HttpCacheService,
    HomeService,
    HttpTestingController
  ], (htttpCacheService: HttpCacheService,
      _homeService: HomeService,
      _httpMock: HttpTestingController) => {

    homeService = _homeService;
    httpMock = _httpMock;

    htttpCacheService.cleanCache();
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
