<template>
  <div>
    <div id="main_content">
      <b-jumbotron>
        <b-modal ref="success-modal" hide-footer title="Sukces" >Zmiany zapisano poprawnie!</b-modal>
        <b-overlay :show="!load_limit_rank" rounded="sm">
          <h1 style="text-align: center; color: white; font-family: 'Itim', cursive"><B>Rangi gier</B></h1>
          <h3 style="text-align: center; color: white; font-family: 'Itim', cursive"><B>dostepne na serwerze TeamSpeak3</B></h3>
          <h6 style="text-align: center; color: white; font-family: 'Itim', cursive"><I>Możesz z poniższej listy wybrać i przydzielić sobie rangi gier.
            Pamiętaj, że w zależności od posiadanych uprawnień na serwerze możesz mieć inny limit rang gier.
            Twój limit to: {{ limit_rank }}</I></h6>
          <div v-for="(component, index) in group_games_list" v-bind:key="index">
            <div class="title"><B>{{ component.groupName }}</B></div>
            <GroupList
              @selected_element="add_checked_element" @remove_element="remove_checked_element"
              :rank_group="component.groupName" :reach_limit="limit_reach"
            />
            <br>
          </div>
          <b-button class="button" variant="warning" @click="set_rank">Zapisz</b-button>
        </b-overlay>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import GroupList from '../components/GroupList'

export default {
  name: 'GameRank.vue',
  components: {
    GroupList
  },
  computed: {
    ...mapState([
      'group_games_list'
    ]),
    limit_reach () {
      if (this.selected_rank.length >= this.limit_rank) {
        return true
      } else return false
    }
  },
  data () {
    return {
      limit_rank: 5,
      load_limit_rank: false,
      selected_rank: []
    }
  },
  methods: {
    add_checked_element (id) {
      this.selected_rank.unshift(id)
    },
    remove_checked_element (id) {
      const pos = this.selected_rank.indexOf(id)
      this.selected_rank.splice(pos, 1)
    },
    set_rank () {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios
        .put(this.$store.state.path_to_server + 'game-rank/set-rank-game', this.selected_rank, { headers })
        .then(response => {
          if (response.status === 200) {
            this.$refs['success-modal'].show()
            setTimeout(this.$refs['success-modal'].hide, 2500)
          }
        })
    }
  },
  mounted () {
    this.$store.dispatch('get_group_rank_list')
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .get(this.$store.state.path_to_server + 'game-rank/current-rank-limit', { headers })
      .then(response => {
        this.limit_rank = response.data
        this.load_limit_rank = true
      })
  }
}
</script>

<style scoped>
#main_content {
  position: absolute;
  text-align: left;
  float: left;
  color: black;
  margin-top: 100px;
  max-width: 1800px;
  overflow: auto;
  display: flex;
  left: 50%;
  transform: translate(-50%);
}
.title {
  font-family: 'Itim', cursive;
  color: #ffc107;
  text-align: center;
  font-size: 35px;

}
.jumbotron {
  background-color: #2e3944;
}
.button {
  float: right;
}
</style>
