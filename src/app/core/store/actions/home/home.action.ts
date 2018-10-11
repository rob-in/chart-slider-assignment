import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Home } from '@app/home/home.model';

export const ADD_CHART_DATA = 'ADD_CHART_DATA';
export const ADD_ACTIVITY_SELECTION = 'ADD_ACTIVITY_SELECTION';

export class AddChartData implements Action {
  readonly type = ADD_CHART_DATA;

  constructor(public payload: Array<number>) {}
}

export class AddActivitySelection implements Action {
  readonly type = ADD_ACTIVITY_SELECTION;

  constructor(public payload: Array<number>) {}
}

export type Actions = AddChartData | AddActivitySelection;
