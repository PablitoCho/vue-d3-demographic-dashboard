<template>
  <main>
    <SearchBar />
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
import LineChart from '@/components/LineChart.vue'
import BarChart from '@/components/BarChart.vue'
import PieChart from '@/components/PieChart.vue'
</script>

<style scoped></style>
