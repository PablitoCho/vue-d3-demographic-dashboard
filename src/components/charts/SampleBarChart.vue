<template>
  <svg
    :width="width"
    :height="height"
    :view-box="[0,0,width,height]"
  >
    <g>
      <rect
        v-for="(d, i) in data"
        :x="xScale(i)"
        :y="yScale(d)"
        :width="xScale.bandwidth()"
        :height="height - padding - yScale(d)"
        :fill="colorScale(i)"
      />
    </g>
  </svg>
</template>

<script setup>
import * as d3 from 'd3'
import { onMounted } from 'vue';

const width = 600
const height = 250
const padding = 25
const data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
						11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ]

// scales, axes
const xScale = d3.scaleBand()
                  .domain(d3.range(data.length))
                  .range([padding, width-padding])
                  .padding(0.05)
const yScale = d3.scaleLinear()
                  .domain([0, d3.max(data)])
                  .range([height - padding, padding])
const colorScale = d3.scaleOrdinal(d3.range(data.length), d3.schemeTableau10)

</script>
