import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SilderComponent } from './silder.component';

describe('SilderComponent', () => {
  let component: SilderComponent;
  let fixture: ComponentFixture<SilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SilderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilderComponent);
    component = fixture.componentInstance;
    component.config = {
      connect: true,
      step: 1,
      range: {
        min: 1,
        max: 10
      },
      pips: {
        mode: 'steps',
        density: 10
      },
      tooltips: true,
      selectionRange: [2, 5]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the default selection range provided in the config', () => {
    expect(component.selectionRange.length).toBe(component.config.selectionRange.length);
    expect(component.selectionRange[0]).toBe(component.config.selectionRange[0]);
    expect(component.selectionRange[1]).toBe(component.config.selectionRange[1]);
  });

  it('should set the new selection range on selection change and emit event data to parent', () => {
    const newRange = [1, 7];
    spyOn(component.selectionChange, 'emit');
    component.onChange(newRange);
    fixture.detectChanges();
    expect(component.selectionRange.length).toBe(newRange.length);
    expect(component.selectionRange[0]).toBe(newRange[0]);
    expect(component.selectionRange[1]).toBe(newRange[1]);
    expect(component.selectionChange.emit).toHaveBeenCalled();
    expect(component.selectionChange.emit).toHaveBeenCalledWith(newRange);
  });
});
