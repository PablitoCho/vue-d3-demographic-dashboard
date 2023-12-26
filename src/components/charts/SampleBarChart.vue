<template>
  <svg></svg>
</template>

<script setup>
import * as d3 from 'd3'
import { onMounted } from 'vue';

const width = 600
const height = 250
const padding = 25
const data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
						11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ]

onMounted(() => {
  // init svg
  const svg = d3
    .select('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewbox', [0, 0, width, height])
      .attr('transform', `translate(${padding}, 0)`)
  
  // scales, axes
  const xScale = d3.scaleBand()
                    .domain(d3.range(data.length))
                    .range([padding, width-padding])
                    .padding(0.05)

  const yScale = d3.scaleLinear()
                    .domain([0, d3.max(data)])
                    .range([height - padding, padding])

  const colorScale = d3.scaleOrdinal(d3.range(data.length), d3.schemeTableau10)

  // create bar chart
  svg
    .append("g")
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
      .attr('x', (d, i) =>  xScale(i))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - padding - yScale(d))
      .attr('fill', (d, i) => colorScale(i))
})

</script>
