import { Component, OnInit, Input } from '@angular/core';
import { SliderConfig } from './slider.model';

@Component({
  selector: 'app-silder',
  templateUrl: './silder.component.html',
  styleUrls: ['./silder.component.scss']
})
export class SilderComponent implements OnInit {
  @Input()
  config: SliderConfig;
  selectionRange: number[];

  constructor() {}

  ngOnInit() {
    this.selectionRange = this.config.selectionRange;
  }

  onChange(event: any) {
    console.log({ event });
  }
}
