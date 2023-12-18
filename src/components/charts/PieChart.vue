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

let colorScale: d3.ScaleOrdinal<string, string, never>
let svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>

// dimensions
const width = 400
const height = 400
const margin = { top: 10, right: 10, bottom: 10, left: 20 }

const outerRadius = width / 3
const innerRadius = 0

const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius)

const title = computed(() => {
  if (props.variable) {
    if (props.variable === 'Birth') return '출생아수'
    if (props.variable === 'Death') return '사망자수'
    if (props.variable === 'Marriage') return '혼인건수'
    if (props.variable === 'Divorce') return '이혼건수'
  }
  return ''
})

const korRegions: { [key: string]: string } = {
  'Busan': '부산',
  'Chungcheongbuk-do': '충북',
  'Chungcheongnam-do': '충남',
  'Daegu': '대구',
  'Daejeon': '대전',
  'Gangwon-do': '강원',
  'Gwangju': '광주',
  'Gyeonggi-do': '경기',
  'Gyeongsangbuk-do': '경북',
  'Gyeongsangnam-do': '경남',
  'Incheon': '인천',
  'Jeju': '제주',
  'Jeollabuk-do': '전북',
  'Jeollanam-do': '전남',
  'Sejong': '세종',
  'Seoul': '서울',
  'Ulsan': '울산',
  'Country': '전국',
  'Etc': '기타'
}

watch(
  () => props.dataset,
  () => {
    const chartDataAll = props
      .dataset!.filter((d) => d.region !== 'Country')
      .map((o) => ({ region: o.region, value: o.value }))
      .sort((a, b) => b.value - a.value)

    const chartData = chartDataAll.slice(0, 5)

    const sumRest = chartDataAll
      .slice(5)
      .map((o) => o.value)
      .reduce((arr, cur) => arr + cur, 0)

    chartData.push({ region: 'Etc', value: sumRest })

    console.log('chartData :', chartData)

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(chartData!.map((d) => d.region))
    // reset svg
    svg = d3
      .select('#pie-chart')
      .attr('height', height)
      .attr('width', width)
      .attr('viewBox', [-(width / 2 + margin.left), -height / 2, width, height - margin.top])

    svg.selectAll('*').remove()

    const pie = d3.pie().sort(null)

    const arcs = svg
      .append('g')
      .selectAll('arc')
      .data(pie(chartData.map((o) => o.value)))
      .enter()
      .append('g')
      .attr('class', 'arc')

    arcs
      .append('path')
      .attr('fill', (d, i) => colorScale(chartData[i].region))
      .attr('d', arc)

    // Labels
    arcs
      .append('text')
      // https://www.geeksforgeeks.org/d3-js-arc-centroid-function/
      // compute the midpoint of the centerline of the arc
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .text((d, i) => korRegions[chartData[i].region])
      .attr('fill', 'white')
  }
)
</script>
