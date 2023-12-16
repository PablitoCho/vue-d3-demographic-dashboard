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

const calHeight = (d:number, maxValue:number, scaler:number=0.8):number => {
  const ratio = height / maxValue
  return d * ratio * scaler
}

watch(
  () => props.dataset,
  () => {
    const barData = props.dataset!
      .filter((data) => data.region !== 'Country')
      .map((o) => {
        return { region : o.region, value : o.value}
      })
    
    console.log('data:', barData)
    maxValue = Math.max(...barData.map(d => d.value))

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
        .attr('y', (d) => height - calHeight(d.value, maxValue))
        .attr('width', width / barData.length - padding)
        .attr('height', (d) => calHeight(d.value, maxValue))
        .attr('fill', 'steelblue')
  }
)
</script>
