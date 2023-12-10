<template>
  <div class="container-fluid py-3">
    <!-- <div class="row"> -->
    <!-- <div class="alert alert-primary" style="height: 20rem">Line Chart Area</div> -->
    <!-- </div> -->
    <svg id="line-chart" :width="width" :height="height"></svg>
  </div>
</template>

<script setup lang="ts">
import type { BirthRate } from '@/services'
import * as d3 from 'd3'
import { watch, type PropType } from 'vue'

const props = defineProps({
  dataset: Array as PropType<BirthRate[][]>
})
// dimensions
const width = 1700
const height = 350
const margin = { top: 10, right: 20, bottom: 30, left: 20 }

let colorScale: d3.ScaleOrdinal<string, string, never>
let svg: d3.Selection<SVGElement, {}, HTMLElement, any>, maxRate: number | undefined
let x: d3.ScaleTime<number, number, never>, y: d3.ScaleLinear<number, number, never>

const formatDate = (date: string) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let year = d.getFullYear()
  if (month.length < 2) month = '0' + month
  return [year, month].join('-')
}

// watch dataset
watch(
  () => props.dataset,
  () => {
    // color for categorical variables
    colorScale = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(props.dataset!.map((data) => data[0].region))

    // reset svg and draw axes
    drawAxes()
    // draw lines for selected regions
    props.dataset!.map((data) => drawLine(data, x, y))

    // add legend
    addLegend(1500)

    // mouse event
    addMouseEvent()
  }
)

const drawAxes = () => {
  // clear svg
  svg = d3.select('#line-chart')
  svg.selectAll('*').remove()

  // preprocess props data
  maxRate = props.dataset
    ?.map((arr) => Math.max(...arr.map((o) => o.birth_rate)))
    .reduce((prev, current) => (prev && prev > current ? prev : current))

  // scales
  x = d3
    .scaleUtc()
    // @ts-ignore
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
    .attr('class', 'line') // for mouse event
    // .attr('stroke', 'steelblue')
    .attr('stroke', colorScale(chartData[0].region))
    .attr('stroke-width', 1.5)
    .attr('d', line(chartData))
}

const addLegend = (legendX: number = 1000) => {
  // legend
  const legend = svg
    .append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${legendX}, 0)`)

  legend
    .selectAll('rect')
    .data(props.dataset!.map((data) => data[0].region))
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', (d, i) => i * 20)
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', (d) => colorScale(d))

  legend
    .selectAll('text')
    .data(props.dataset!.map((data) => data[0].region))
    .enter()
    .append('text')
    .attr('x', 15) // Position text next to the rectangle
    .attr('y', (d, i) => i * 20 + 9) // Align text with rectangles
    .text((d) => d)
    .style('font-size', '12px')
    .attr('text-anchor', 'start')
}

const addMouseEvent = () => {
  // mouse event
  // circles
  const circles = colorScale.domain().map((name) => ({
    name,
    values: props
      .dataset!.filter((x) => x[0].region === name)[0]
      .map((d: BirthRate) => ({
        date: d.date,
        rate: d.birth_rate
      }))
  }))

  const mouseG = svg.append('g').attr('class', 'mouse-over-effects')

  mouseG
    .append('path')
    .attr('class', 'mouse-line')
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .style('opacity', '0')

  const lines = document.getElementsByClassName('line')

  const mousePerLine = mouseG
    .selectAll('.mouse-per-line')
    .data(circles)
    .enter()
    .append('g')
    .attr('class', 'mouse-per-line')

  mousePerLine
    .append('circle')
    .attr('r', 7)
    .style('stroke', (d) => colorScale(d.name))
    .style('fill', 'none')
    .style('stroke-width', '1px')
    .style('opacity', '0')

  mousePerLine.append('text').attr('transform', 'translate(10,3)')

  mouseG
    .append('svg:rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .on('mouseout', function () {
      // on mouse out hide line, circles and text
      d3.select('.mouse-line').style('opacity', '0')
      d3.selectAll('.mouse-per-line circle').style('opacity', '0')
      d3.selectAll('.mouse-per-line text').style('opacity', '0')
    })
    .on('mouseover', function () {
      // on mouse in show line, circles and text
      d3.select('.mouse-line').style('opacity', '1')
      d3.selectAll('.mouse-per-line circle').style('opacity', '1')
      d3.selectAll('.mouse-per-line text').style('opacity', '1')
    })
    .on('mousemove', function () {
      // mouse moving over canvas
      const mouse = d3.pointer(event)
      d3.select('.mouse-line').attr('d', function () {
        let d = 'M' + mouse[0] + ',' + height
        d += ' ' + mouse[0] + ',' + 0
        return d
      })
      d3.selectAll('.mouse-per-line').attr('transform', function (d, i) {
        // Object.keys(d).map(key => console.log(key, d[key]))
        // console.log(width/mouse[0])
        const xDate = x.invert(mouse[0])
        const bisect = d3.bisector((d) => d.date).right
        const idx = bisect(d.values, xDate)

        let beginning: number | null = 0
        let end = (lines[i] as SVGGeometryElement).getTotalLength()
        let target = null
        let pos: DOMPoint

        while (true) {
          target = Math.floor((beginning + end) / 2)
          pos = (lines[i] as SVGGeometryElement).getPointAtLength(target)
          if ((target === end || target === beginning) && pos.x !== mouse[0]) {
            break
          }
          if (pos.x > mouse[0]) end = target
          else if (pos.x < mouse[0]) beginning = target
          else break //position found
        }

        // tooltip format
        d3.select(this)
          .select('text')
          .text(`${formatDate(xDate)}, ${d.name}, ${y.invert(pos.y).toFixed(2)}`) //formatDate(xDate) + d.name + y.invert(pos.y).toFixed(2)
        return 'translate(' + mouse[0] + ',' + pos.y + ')'
      })
    })
}
</script>
