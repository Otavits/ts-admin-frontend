<template>
  <b-overlay :show="!status_load" rounded="sm" variant="dark" class="overlay">
    <div class="main">
      <div class="icon" >
        <i :class="icon"></i>
      </div>
      <div class="ss">
        <div class="label" >
         {{ label }}
        </div>
        <div v-if="small_content!==true" class="content_xl">
          {{ content }}
        </div>
        <div v-if="small_content===true" class="content_sm">
          {{ content }}
        </div>
      </div>
    </div>
    <template #overlay>
      <div class="text-center">
        <b-icon icon="stopwatch" font-scale="1.5" animation="cylon"></b-icon>
        <p id="cancel-label" style="font-size: 12px">Ładowanie danych</p>
      </div>
    </template>
  </b-overlay>
</template>

<script>
export default {
  name: 'InfoTab_UserCard.vue',
  props: {
    label: null,
    content: null,
    status_load: null,
    icon: null,
    small_content: null
  },
  mounted () {
  }
}
</script>

<style scoped>
.overlay {
  height: 100%;
}
.main {
  height: 100%;
  font-family: 'Itim', cursive;
  text-align: center;
  font-size:  2vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}
.label {
  font-size: 1.5vw;
  color: #ffc107;
}
.icon {
  position: static;
  color: #ffc107;
}
.content_sm {
  font-size: 1vw;
}
</style>
