<template>
  <div class="container-fluid py-3">
    <!-- <div class="row"> -->
    <!-- <div class="alert alert-primary" style="height: 20rem">Line Chart Area</div> -->
    <!-- </div> -->
    <svg :width="width" :height="height"></svg>
  </div>
</template>

<script setup lang="ts">
import type { BirthRate } from '@/services'
import * as d3 from 'd3'
import { watch } from 'vue'
import { type PropType } from 'vue'

const props = defineProps({
  dataset: Array as PropType<BirthRate[][]>
})
// dimensions
const width = 1500
const height = 300
const margin = { top: 10, right: 20, bottom: 30, left: 20 }

let svg: d3.Selection<SVGElement, {}, HTMLElement, any>, maxRate: number | undefined
let x: d3.ScaleTime<number, number, never>, y: d3.ScaleLinear<number, number, never>
// watch dataset
watch(
  () => props.dataset,
  () => {
    // reset svg and draw axes
    drawAxes()
    // draw lines for selected regions
    props.dataset!.map((data) => drawLine(data, x, y))
  }
)

const drawAxes = () => {
  // clear svg
  svg = d3.select('svg')
  svg.selectAll('*').remove()

  // preprocess props data
  maxRate = props.dataset
    ?.map((arr) => Math.max(...arr.map((o) => o.birth_rate)))
    .reduce((prev, current) => (prev && prev > current ? prev : current))

  // scales
  x = d3
    .scaleUtc()
    .domain(d3.extent(props.dataset![0], (d) => new Date(d.date)))
    .range([margin.left, width - margin.right])

  y = d3
    .scaleLinear()
    .domain([0, maxRate! + 2.0])
    .range([height - margin.bottom, margin.top])

  // select svg container
  svg.attr('viewBox', [0, 0, width, height])

  // append axes
  // Add the x-axis.
  svg
    .append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    )

  // Add the y-axis, remove the domain line, add grid lines and a label.
  svg
    .append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select('.domain').remove())
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('x2', width - margin.left - margin.right)
        .attr('stroke-opacity', 0.1)
    )
    .call((g) =>
      g
        .append('text')
        .attr('x', -margin.left)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text('Birth Rate(%)')
    )
}

const drawLine = (
  chartData: BirthRate[],
  x: d3.ScaleTime<number, number, never>,
  y: d3.ScaleLinear<number, number, never>
) => {
  // Declare the line generator.
  const line = d3
    .line()
    .x((d) => x(new Date(d.date)))
    .y((d) => y(d.birth_rate ? d.birth_rate : 0)) // 세종의 경우 2012년까지 birth rate가 null

  // Append a path for the line.
  svg
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', line(chartData))
}
</script>
