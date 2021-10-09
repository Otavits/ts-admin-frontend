<template>
  <div :class="[!checked ? 'main' : 'main_checked']">
    <div class="element">
      <div class="icon"><i :class="icon"></i></div>
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
}
.main:hover {
  background-color: #ffc107;
}
.main_checked {
  background-color: #ffc107;
  height: 100%;
}
.main_checked:hover {
  background-color: rgba(36,36,36,0.0);
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
