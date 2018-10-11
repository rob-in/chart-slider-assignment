import { Action } from '@ngrx/store';
import { Home } from '@app/home/home.model';
import * as HomeActions from '../../actions/home/home.action';

// Section 1
const initialState: Home = {
  chartData: [],
  activitySelection: []
};

// Section 2
export function reducer(
  state: Home = initialState,
  action: HomeActions.Actions
) {
  // Section 3
  switch (action.type) {
    case HomeActions.ADD_CHART_DATA:
      return {...state, chartData: action.payload};
      case HomeActions.ADD_ACTIVITY_SELECTION:
      return {...state, activitySelection: action.payload};
    default:
      return state;
  }
}

export const getChartData = (state: Home) => state.chartData;
export const getActivitiesSelectionData = (state: Home) => state.activitySelection;

