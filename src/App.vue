<template>
  <main>
    <SearchBar 
      @search-data="fetchDemographicData"
    />
    <LineChart />
    <div class="container-fluid">
      <div class="row">
        <BarChart />
        <PieChart />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'

const fetchDemographicData = () => console.log('hi')

// import { fetchDemographicData } from '@/services'

</script>

<style scoped></style>
