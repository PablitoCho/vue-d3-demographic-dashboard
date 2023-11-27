<template>
  <div class="navbar navbar-light bg-light">
    <div class="container-fluid d-flex justify-content-center">
      <label class="mx-3">지역</label>
      <div class="col-7 p-2">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="전국" />
          <label class="form-check-label">전국</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="서울" />
          <label class="form-check-label">서울</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="대전" />
          <label class="form-check-label">대전</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="대구" />
          <label class="form-check-label">대구</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="부산" />
          <label class="form-check-label">부산</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="광주" />
          <label class="form-check-label">광주</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="울산" />
          <label class="form-check-label">울산</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="인천" />
          <label class="form-check-label">인천</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="세종" />
          <label class="form-check-label">세종</label>
        </div>
        <br>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="경기도" />
          <label class="form-check-label">경기도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="충청북도" />
          <label class="form-check-label">충청북도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="충청남도" />
          <label class="form-check-label">충청남도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="경상북도" />
          <label class="form-check-label">경상북도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="경상남도" />
          <label class="form-check-label">경상남도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="전라북도" />
          <label class="form-check-label">전라북도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="전라남도" />
          <label class="form-check-label">전라남도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="강원도" />
          <label class="form-check-label">강원도</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" value="제주도" />
          <label class="form-check-label">제주도</label>
        </div>
      </div>
      <div class="col-2 p-2">
        <div class="form-floating">
          <select class="form-select" aria-label="Floating label select example">
            <option selected>Select Variable</option>
            <option value="birth">출생아수</option>
            <option value="death">사망자수</option>
            <option value="marriage">혼인건수</option>
            <option value="divorce">이혼건수</option>
          </select>
          <label for="floatingSelect">Bar Chart 변수</label>
        </div>
      </div>
      <div class="col-2 p-2">
        <div class="form-floating">
          <select class="form-select" aria-label="Floating label select example">
            <option selected>Select Variable</option>
            <option value="birth">출생아수</option>
            <option value="death">사망자수</option>
            <option value="marriage">혼인건수</option>
            <option value="divorce">이혼건수</option>
          </select>
          <label for="floatingSelect">Pie Chart 변수</label>
        </div>
      </div>
      <button type="button" class="btn btn-primary mx-2">조회</button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.form-check {
  width: 5rem;
}
</style>
