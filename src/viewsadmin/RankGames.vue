<template>
  <div>
    <div id="main_content">
      <b-jumbotron>
        <h1 style="text-align: center"><B>Lista rang gier</B></h1>
          <div v-for="(component, index) in group_games_list" v-bind:key="index">
            <div class="title"><B>{{ component.group_name }}</B></div>
            <TableGameRank :data="component" />
            <br>
          </div>
        <div id="footer">
          <div id="footer-left">
            <b-button variant="danger">USUŃ GRUPĘ</b-button>
          </div>
          <div id="footer-right">
            <b-button variant="success">DODAJ GRUPĘ</b-button>
          </div>
        </div>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import TableGameRank from '../components/TableGameRank'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      list: [
        { group_name: 'Ogólne' },
        { group_name: 'Ogóln2e' }
      ]
    }
  },
  components: {
    TableGameRank
  },
  mounted () {
    this.$store.dispatch('get_group_rank_list')
  },
  computed: {
    ...mapState([
      'group_games_list'
    ])
  }
}
</script>

<style lang="scss" scoped>
#main {
  background-color:#3b4650;
}
#main_content {
  position: absolute;
  text-align: left;
  float: left;
  color: black;
  margin-top: 100px;
  max-width: 1800px;
  overflow: auto;
  display: flex;
}
#footer {
  display: inline;
}
#footer-left {
  float: left;
}
#footer-right {
  float: right;
}
.title {
  text-align: center;
  font-size: 25px;

}
</style>
