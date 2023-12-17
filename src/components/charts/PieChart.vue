<template>
  <div class="col-4 px-0">
    <svg id="pie-chart" :width="width" :height="height"></svg>
  </div>
</template>

<script setup lang="ts">
import type { DemographicValue } from '@/services'
import * as d3 from 'd3'
import { watch, type PropType, computed } from 'vue'

const props = defineProps({
  dataset: Array as PropType<DemographicValue[]>,
  variable: String
})

let svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>

// dimensions
const width = 400
const height = 400

const outerRadius = width / 2
const innerRadius = 0

const title = computed(() => {
  if (props.variable) {
    if (props.variable === 'Birth') return '출생아수'
    if (props.variable === 'Death') return '사망자수'
    if (props.variable === 'Marriage') return '혼인건수'
    if (props.variable === 'Divorce') return '이혼건수'
  }
  return ''
})

watch(
  () => props.dataset,
  () => {
    // draw chart

  }
)
</script>
