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
const innerRadius = width / 6

const arc = d3.arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius)

const korRegions: { [key: string]: string } = {
  Busan: '부산',
  'Chungcheongbuk-do': '충북',
  'Chungcheongnam-do': '충남',
  Daegu: '대구',
  Daejeon: '대전',
  'Gangwon-do': '강원',
  Gwangju: '광주',
  'Gyeonggi-do': '경기',
  'Gyeongsangbuk-do': '경북',
  'Gyeongsangnam-do': '경남',
  Incheon: '인천',
  Jeju: '제주',
  'Jeollabuk-do': '전북',
  'Jeollanam-do': '전남',
  Sejong: '세종',
  Seoul: '서울',
  Ulsan: '울산',
  Country: '전국',
  Etc: '기타'
}

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
    const chartDataAll = props
      .dataset!.filter((d) => d.region !== 'Country')
      .map((o) => ({ region: o.region, value: o.value }))
      .sort((a, b) => b.value - a.value)

    const country = props.dataset!.find((d) => d.region === 'Country')?.value
    const chartData = chartDataAll.slice(0, 5)

    const sumRest = chartDataAll
      .slice(5)
      .map((o) => o.value)
      .reduce((arr, cur) => arr + cur, 0)

    chartData.push({ region: 'Etc', value: sumRest })

    console.log('chartData :', chartData)

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(chartData!.map((d) => d.region))
    // reset
    d3.select('.tooltip').remove()

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

    // title
    svg
      .append('text')
      .attr("x", -(margin.left / 2))
      .attr("y", -(height / 2) + margin.top)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .text(title.value)

    // Labels
    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      // .attr('transform', (d) => {
      //   const _d = arc.centroid(d)
      //   _d[0] *= 1.5
      //   _d[1] *= 1.5
      //   return `translate(${_d})`
      // })
      .attr('text-anchor', 'middle')
      .text((d, i) => korRegions[chartData[i].region])
      .attr('fill', 'white')

    svg.append("text")
      .attr("id","title")
      .attr("x", -(margin.left / 2))
      .attr("y", -(margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px")
      .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 0)
        .text(`${title.value}`)
      .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 20)
        .text(`전국:${country}`)
      // .text(`${title.value}\n전국:${120}`)

    // tooltip
    const div = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0)

    const addTooltip = (event: MouseEvent, d: d3.PieArcDatum<number | { valueOf(): number }>) => {
      div.style('opacity', 1)
      div
        .html(`${d.data}`)
        .style('left', event.pageX + 'px')
        .style('top', event.pageY + 'px')
    }

    arcs
      .on('mouseover', addTooltip)
      .on('mousemove', addTooltip)
      .on('mouseout', () => div.style('opacity', 0))
  }
)
</script>

<style>
div.tooltip {
  position: absolute;
  text-align: center;
  width: 120px;
  height: 20px;
  padding: 2px;
  font: 12px sans-serif;
  background: white;
  border: 1px solid;
  border-radius: 3px;
  pointer-events: none;
}
</style>
