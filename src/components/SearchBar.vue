<template>
  <div class="navbar navbar-light bg-light">
    <div class="container-fluid d-flex justify-content-center">
      <label class="mx-2">지역</label>
      <div class="col-7 p-2">
        <div v-for="region in regions" class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="checkbox"
            @change="
              $emit('checkRegions', region.value, ($event.target as HTMLInputElement).checked)
            "
          />
          {{ region.label }}
        </div>
      </div>
      <div class="col-2 p-2">
        <div class="form-floating">
          <select
            class="form-select"
            aria-label="Floating label select"
            @change="$emit('selectBarChartVariable', ($event.target as HTMLSelectElement).value)"
          >
            <option selected>Select Variable</option>
            <option value="Birth">출생아수</option>
            <option value="Death">사망자수</option>
            <option value="Marriage">혼인건수</option>
            <option value="Divorce">이혼건수</option>
          </select>
          <label for="floatingSelect">Bar Chart 변수</label>
        </div>
      </div>
      <div class="col-2 p-2">
        <div class="form-floating">
          <select
            class="form-select"
            aria-label="Floating label select"
            @change="$emit('selectPieChartVariable', ($event.target as HTMLSelectElement).value)"
          >
            <option selected>Select Variable</option>
            <option value="Birth">출생아수</option>
            <option value="Death">사망자수</option>
            <option value="Marriage">혼인건수</option>
            <option value="Divorce">이혼건수</option>
          </select>
          <label for="floatingSelect">Pie Chart 변수</label>
        </div>
      </div>
      <button type="button" class="btn btn-primary mx-2" @click="$emit('searchData')">조회</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['searchData', 'checkRegions', 'selectBarChartVariable', 'selectPieChartVariable'])

const regions = [
  { label: '전국', value: 'Country' },
  { label: '서울', value: 'Seoul' },
  { label: '대전', value: 'Daejeon' },
  { label: '대구', value: 'Daegu' },
  { label: '부산', value: 'Busan' },
  { label: '광주', value: 'Gwangju' },
  { label: '울산', value: 'Ulsan' },
  { label: '인천', value: 'Incheon' },
  { label: '세종', value: 'Sejong' },
  { label: '경기도', value: 'Gyeonggi-do' },
  { label: '충청북도', value: 'Chungcheongbuk-do' },
  { label: '충청남도', value: 'Chungcheongnam-do' },
  { label: '경상북도', value: 'Gyeongsangbuk-do' },
  { label: '경상남도', value: 'Gyeongsangnam-do' },
  { label: '전라북도', value: 'Jeollabuk-do' },
  { label: '전라남도', value: 'Jeollanam-do' },
  { label: '강원도', value: 'Gangwon-do' },
  { label: '제주도', value: 'Jeju' }
]
</script>

<style scoped>
.form-check {
  width: 5rem;
}
</style>
