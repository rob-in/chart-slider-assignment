import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { BAR_CHART_CONFIG } from './bar-chart.config';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('chart')
  private chartContainer: ElementRef;
  @Input()
  private data: Array<any>;
  private _config = BAR_CHART_CONFIG;
  private margin: any = this._config.chartConfig.margin;
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() {}

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg
      .append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = this.data.map(d => d[0]);
    const yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = d3
      .scaleBand()
      .padding(0.1)
      .domain(xDomain)
      .rangeRound([0, this.width]);
    this.yScale = d3
      .scaleLinear()
      .domain(yDomain)
      .range([this.height, 0]);

    // bar colors
    this.colors = d3
      .scaleLinear()
      .domain([0, this.data.length])
      .range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg
      .append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg
      .append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar').data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart
      .selectAll('.bar')
      .transition()
      .attr('x', (d: any) => this.xScale(d[0]))
      .attr('y', (d: any) => this.yScale(d[1]))
      .attr('width', (d: any) => this.xScale.bandwidth())
      .attr('height', (d: any) => this.height - this.yScale(d[1]))
      .style('fill', (d: any, i: any) => (d[2] ? '#00b7a1' : 'grey'));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => this.xScale(d[0]))
      .attr('y', (d: any) => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d: any, i: any) => (d[2] ? '#00b7a1' : 'grey'))
      .transition()
      .delay((d: any, i: any) => i * 10)
      .attr('y', (d: any) => this.yScale(d[1]))
      .attr('height', (d: any) => this.height - this.yScale(d[1]));
  }
}