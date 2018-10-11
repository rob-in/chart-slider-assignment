import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule, Store } from '@ngrx/store';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeComponent } from './home.component';
import { reducer } from '../core/store/reducers/home/home.reducers';
import * as HomeActions from '../core/store/actions/home/home.action';
import { AppState } from '@app/app.state';
import { Home } from './home.model';
import { HomeService } from './home.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<any>;
  const homeData: Home = {
    chartData: [11, 22, 33, 44, 55, 66],
    activitySelection: [2, 4]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        CoreModule,
        SharedModule,
        HttpClientTestingModule,
        StoreModule.forRoot({ reducer })
      ],
      declarations: [HomeComponent],
      providers: [HomeService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    store.dispatch({
      type: HomeActions.ADD_CHART_DATA,
      payload: {
        home: homeData
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
