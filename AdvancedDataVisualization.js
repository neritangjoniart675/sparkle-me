/*
Filename: AdvancedDataVisualization.js

Description: This JavaScript code demonstrates advanced data visualization techniques using D3.js library. It creates an interactive and visually appealing scatter plot chart with multiple data points, tooltips, and smooth animations.

Author: John Doe
Date: September 1, 2022
*/

// Import required libraries
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Set up SVG container
const svg = d3.select('body')
  .append('svg')
  .attr('width', 800)
  .attr('height', 500)
  .attr('class', 'chart');

// Define chart dimensions and margins
const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;

// Set up scales and axes
const x = d3.scaleLinear()
  .range([0, width]);
const y = d3.scaleLinear()
  .range([height, 0]);
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

// Load data from external JSON file
d3.json('data.json').then(data => {

  // Perform data preprocessing
  const processedData = data.map(d => ({
    x: +d.x,
    y: +d.y,
    label: d.label
  }));

  // Set domain for scales
  x.domain(d3.extent(processedData, d => d.x)).nice();
  y.domain(d3.extent(processedData, d => d.y)).nice();

  // Add chart title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', margin.top)
    .attr('text-anchor', 'middle')
    .attr('class', 'title')
    .text('Advanced Scatter Plot');

  // Add axes
  svg.append('g')
    .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
    .call(xAxis);
  svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(yAxis);

  // Add data points
  svg.selectAll('.point')
    .data(processedData)
    .enter().append('circle')
    .attr('class', 'point')
    .attr('r', 5)
    .attr('cx', d => x(d.x) + margin.left)
    .attr('cy', d => y(d.y) + margin.top)
    .on('mouseover', showTooltip)
    .on('mouseout', hideTooltip);

  // Add tooltips
  const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  function showTooltip(d) {
    tooltip.transition()
      .duration(200)
      .style('opacity', .9);
    tooltip.html(`Label: ${d.label}<br/>X: ${d.x}<br/>Y: ${d.y}`)
      .style('left', (d3.event.pageX) + 'px')
      .style('top', (d3.event.pageY - 28) + 'px');
  }

  function hideTooltip() {
    tooltip.transition()
      .duration(500)
      .style('opacity', 0);
  }

  // Smoothly animate data points
  svg.selectAll('.point')
    .transition()
    .duration(1000)
    .attr('r', 10)
    .transition()
    .duration(1000)
    .attr('r', 5);
});