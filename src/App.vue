<template>
  <main>
    <SearchBar
      @search-data="fetchDemographicData"
      @check-regions="(region, checked) => updateRegions(region, checked)"
      @select-bar-chart-variable="(variable) => (selectedBarChartVariable = variable)"
      @select-pie-chart-variable="(variable) => (selectedPieChartVariable = variable)"
    />
    <LineChart :dataset="lineChartData" />
    <div class="container-fluid">
      <div class="row">
        <BarChart :dataset="barChartData" />
        <PieChart :dataset="pieChartData" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import {
  getBirthRates,
  getDemographicValues,
  type BirthRate,
  type DemographicValue
} from '@/services'
import { ref, type Ref } from 'vue'

const selectedRegions: Ref<string[]> = ref([])
const selectedBarChartVariable: Ref<string> = ref('')
const selectedPieChartVariable: Ref<string> = ref('')

const lineChartData: Ref<BirthRate[][]> = ref([])
const barChartData: Ref<DemographicValue[]> = ref([])
const pieChartData: Ref<DemographicValue[]> = ref([])

const fetchDemographicData = () => {
  if (selectedRegions.value) {
    getBirthRates(selectedRegions.value)
      .then((data) => (lineChartData.value = data))
      .catch((err) => console.error(err))
  }

  if (selectedBarChartVariable.value) {
    getDemographicValues(selectedBarChartVariable.value)
      .then((data) => (barChartData.value = data))
      .catch((err) => console.error(err))
  }

  if (selectedPieChartVariable.value) {
    getDemographicValues(selectedPieChartVariable.value)
      .then((data) => (pieChartData.value = data))
      .catch((err) => console.error(err))
  }
}

const updateRegions = (region: string, checked: boolean) => {
  if (checked) selectedRegions.value.push(region)
  else {
    const index = selectedRegions.value.indexOf(region)
    if (index !== -1) selectedRegions.value.splice(index, 1)
  }
}
</script>
