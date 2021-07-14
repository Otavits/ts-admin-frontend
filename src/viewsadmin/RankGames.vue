<template>
  <div>
    <div id="main_content">
      <b-jumbotron>
        <h1 style="text-align: center"><B>Lista rang gier</B></h1>
          <div v-for="(component, index) in group_games_list" v-bind:key="index">
            <div class="title" @click="group_click(component)"><B>{{ component.group_name }}</B></div>
            <TableGameRank :data="component" />
            <br>
          </div>
        <div id="footer">
          <div id="footer-left">
            <b-button variant="danger">USUŃ GRUPĘ</b-button>
          </div>
          <div id="footer-right">
            <b-button variant="success" @click="add_new">DODAJ GRUPĘ</b-button>
          </div>
        </div>
      </b-jumbotron>
    </div>
    <RankGroupCard v-if="visible_admin_card" :data="data_to_card" :status="visible_admin_card" @status_back="back"/>
  </div>
</template>

<script>
import TableGameRank from '../components/TableGameRank'
import RankGroupCard from '../components/RankGroupCard'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      list: [
        { group_name: 'Ogólne' },
        { group_name: 'Ogóln2e' }
      ],
      visible_admin_card: false,
      data_to_card: null
    }
  },
  components: {
    TableGameRank,
    RankGroupCard
  },
  mounted () {
    this.$store.dispatch('get_group_rank_list')
  },
  computed: {
    ...mapState([
      'group_games_list'
    ])
  },
  methods: {
    group_click (data) {
      this.data_to_card = data
      this.visible_admin_card = true
    },
    back () {
      this.visible_admin_card = false
      window.location.reload()
    },
    add_new () {
      this.data_to_card = null
      this.visible_admin_card = true
    }
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
