<template>
  <div :class="[!checked ? 'main' : 'main_checked']">
    <div class="element">
      <div class="icon">
        <b style="font-weight: 900"><b-icon-arrow-repeat :animation="checked ? 'spin' : ''">d</b-icon-arrow-repeat></b></div>
      <div class="label">{{ label }} </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchButton.vue',
  props: {
    checked: null,
    icon: null,
    label: null
  }
}
</script>

<style scoped>
.main {
  height: 100%;
  transition: background .2s ease-in
}
.main:hover {
  background-color: #ffc107;
}
.main_checked {
  background-color: #ffc107;
  height: 100%;
}
.element {
  padding: 2px;
  display: flex;
  justify-content: space-around;
  font-size: 1.5vw;
  align-items: center;
  text-align: center;
  height: 100%;
}
</style>
