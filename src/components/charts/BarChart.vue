<template>
  <div class="col-8 px-0">
    <svg id="bar-chart" :width="width" :height="height"></svg>
  </div>
</template>

<script setup lang="ts">
import type { DemographicValue } from '@/services'
import * as d3 from 'd3'
import { watch, type PropType } from 'vue'

const props = defineProps({
  dataset: Array as PropType<DemographicValue[]>
})

// dimensions
const width = 1000
const height = 400
const margin = { top: 10, right: 20, bottom: 30, left: 20 }
const padding = 1

// reusable variables
let svg: d3.Selection<SVGElement, {}, HTMLElement, any>
let maxValue: number

watch(
  () => props.dataset,
  () => {
    const barData = props.dataset!.map((o) => o.value)
    maxValue = Math.max(...barData)
    console.log('data:', barData)

    // clear svg
    svg = d3.select('#bar-chart')
    svg.selectAll('*').remove()

    svg
      .attr('viewBox', [0, 0, width, height])
      .attr('transform', `translate(${margin.left + margin.right}, 0)`)

    svg
      .selectAll('rect')
      .data(barData)
      .enter()
      .append('rect')
        .attr('x', (d, i) => i * (width / barData.length))
        .attr('y', (d) => height - d)
        .attr('width', width / barData.length - padding)
        .attr('height', (d) => d)
        .attr('fill', 'steelblue')
  }
)
</script>
