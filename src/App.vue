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
import { getBirthRates, getDemographicValues } from '@/services'


const fetchDemographicData = () => {
  const result = getBirthRates(['Seoul', 'Busan', 'Jeju']);
  result
    .then(data => console.log(data))
    .catch(err => console.error(err))

  const result2 = getDemographicValues('Death');
  result2
    .then(data => console.log(data))
    .catch(err => console.error(err))
}

</script>

<style scoped></style>
