// import { Injectable } from '@angular/core';
// import * as d3 from 'd3';
// import { BAR_CHART_CONFIG } from './bar-chart.config';
// import { BarChartDimenssions } from './bar-chart.model';

// @Injectable()
// export class BarChartService {
//   private _config = BAR_CHART_CONFIG;
//   private _margin: any = this._config.chartConfig.margin;
//   private chart: any;
//   private width: number;
//   private height: number;
//   private xScale: any;
//   private yScale: any;
//   private colors: any;
//   private xAxis: any;
//   private yAxis: any;

//   constructor() {}

//   createChart(chartContainer: any, data: any) {
//     const element = chartContainer.nativeElement;
//     const dimenssions: BarChartDimenssions = this._getChartDimmensions(element);
//     this.width = dimenssions.width;
//     this.height = dimenssions.height;
//     const svg = d3
//       .select(element)
//       .append('svg')
//       .attr('width', element.offsetWidth)
//       .attr('height', element.offsetHeight);

//     // chart plot area
//     this.chart = svg
//       .append('g')
//       .attr('class', 'bars')
//       .attr('transform', `translate(${this._margin.left}, ${this._margin.top})`);

//     // define X & Y domains
//     const xDomain = data.map(d => d[0]);
//     const yDomain = [0, d3.max(data, d => d[1])];

//     // create scales
//     this.xScale = d3
//       .scaleBand()
//       .padding(0.1)
//       .domain(xDomain)
//       .rangeRound([0, this.width]);
//     this.yScale = d3
//       .scaleLinear()
//       .domain(yDomain)
//       .range([this.height, 0]);

//     // bar colors
//     this.colors = d3
//       .scaleLinear()
//       .domain([0, data.length])
//       .range(<any[]>['red', 'blue']);

//     // x & y axis
//     this.xAxis = svg
//       .append('g')
//       .attr('class', 'axis axis-x')
//       .attr('transform', `translate(${this._margin.left}, ${this._margin.top + this.height})`)
//       .call(d3.axisBottom(this.xScale));
//     this.yAxis = svg
//       .append('g')
//       .attr('class', 'axis axis-y')
//       .attr('transform', `translate(${this._margin.left}, ${this._margin.top})`)
//       .call(d3.axisLeft(this.yScale));
//   }

//   private _getChartDimmensions(element: any): BarChartDimenssions {
//     return {
//       width: element.offsetWidth - this._margin.left - this._margin.right,
//       height: element.offsetHeight - this._margin.top - this._margin.bottom
//     };
//   }
// }
