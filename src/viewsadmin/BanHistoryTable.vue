<template>
  <div id="main_content">
    <div id="container">
      <b-jumbotron>
        <h1>Elektroniczny system warnów v 3.0</h1>
        <h3>w tym miejscu możesz tylko przeglądać lub edytować istniejące warny, aby nadać warna skorzystaj z sekcji użytkownicy</h3>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BanHistoryTable.vue'
}
</script>

<style lang="scss" scoped>
@import "style";
#container {
  font-family: 'Itim', cursive;
  text-align: center;
}
#container h1 {
  font-size: 2.8vw;
  color: #ffc107;
}
#container h3 {
  font-size: 1vw;
  color: #E87538;
  padding: 5px 30%;
}
</style>
