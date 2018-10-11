import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartComponent } from './bar-chart.component';

const _chartData = [['Activity 1', 22, true], ['Activity 2', 32, true], ['Activity 3', 76, true]];

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    component.data = _chartData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
