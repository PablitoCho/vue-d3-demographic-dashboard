<template>
  <div class="navbar navbar-light bg-light">
    <div class="container-fluid d-flex justify-content-center">
      <label class="mx-3">지역</label>
      <div class="col-7 p-2">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Country" />
          <label class="form-check-label">전국</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Seoul" />
          <label class="form-check-label">서울</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Daejeon" />
          <label class="form-check-label">대전</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Daegu" />
          <label class="form-check-label">대구</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Busan" />
          <label class="form-check-label">부산</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Gwangju" />
          <label class="form-check-label">광주</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Ulsan" />
          <label class="form-check-label">울산</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Incheon" />
          <label class="form-check-label">인천</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="세종" />
          <label class="form-check-label">세종</label>
        </div>
        <br>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Gyeonggi-do" />
          <label class="form-check-label">경기도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Chungcheongbuk-do" />
          <label class="form-check-label">충청북도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Chungcheongnam-do" />
          <label class="form-check-label">충청남도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Gyeongsangbuk-do" />
          <label class="form-check-label">경상북도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Gyeongsangnam-do" />
          <label class="form-check-label">경상남도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Jeollabuk-do" />
          <label class="form-check-label">전라북도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Jeollanam-do" />
          <label class="form-check-label">전라남도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Gangwon-do" />
          <label class="form-check-label">강원도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="Jeju" />
          <label class="form-check-label">제주도</label>
        </div>
      </div>
      <div class="col-2 p-2">
        <div class="form-floating">
          <select class="form-select" aria-label="Floating label select example">
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
          <select class="form-select" aria-label="Floating label select example">
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
defineEmits(['searchData'])
</script>

<style scoped>
.form-check {
  width: 5rem;
}
</style>
