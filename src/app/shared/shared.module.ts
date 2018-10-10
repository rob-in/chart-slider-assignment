import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NouisliderModule } from 'ng2-nouislider';
import { MaterialModule } from '@app/material.module';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SilderComponent } from './silder/silder.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    NouisliderModule
  ],
  declarations: [
    LoaderComponent,
    BarChartComponent,
    SilderComponent
  ],
  exports: [
    LoaderComponent,
    BarChartComponent,
    SilderComponent
  ]
})
export class SharedModule { }
