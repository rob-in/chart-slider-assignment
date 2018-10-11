import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SliderConfig } from './slider.model';

@Component({
  selector: 'app-silder',
  templateUrl: './silder.component.html',
  styleUrls: ['./silder.component.scss']
})
export class SilderComponent implements OnInit {
  @Input()
  config: SliderConfig;
  @Output()
  selectionChange = new EventEmitter<Array<number>>();

  selectionRange: number[];

  constructor() {}

  ngOnInit() {
    this.selectionRange = this.config.selectionRange;
  }

  onChange(event: Array<number>) {
    this.selectionRange = event;
    this.selectionChange.emit(event);
  }
}
