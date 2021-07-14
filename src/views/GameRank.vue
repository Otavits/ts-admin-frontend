<template>
  <div>
    <div id="main_content">
      <b-jumbotron>
        <b-overlay :show="!load_limit_rank" rounded="sm">
          <h1 style="text-align: center"><B>Rangi gier</B></h1>
          <h3 style="text-align: center"><B>dostepne na serwerze TeamSpeak3</B></h3>
          <h6 style="text-align: center"><I>Możesz z poniższej listy wybrać i przydzielić sobie rangi gier.
            Pamiętaj, że w zależności od posiadanych uprawnień na serwerze możesz mieć inny limit rang gier.
            Twój limit to: {{ limit_rank }}</I></h6>
          <div v-for="(component, index) in group_games_list" v-bind:key="index">
            <div class="title"><B>{{ component.group_name }}</B></div>
            <GroupList
              @selected_element="add_checked_element" @remove_element="remove_checked_element"
              :rank_group="component.group_name" :reach_limit="limit_reach"
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
      console.log('add')
      console.log(id)
      this.selected_rank.unshift(id)
    },
    remove_checked_element (id) {
      console.log('remove')
      console.log(id)
      const pos = this.selected_rank.indexOf(id)
      this.selected_rank.splice(pos, 1)
    },
    set_rank () {
      this.$store.dispatch('set_game_rank', this.selected_rank)
    }
  },
  mounted () {
    this.$store.dispatch('get_group_rank_list')
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .get(this.$store.state.path_to_server + 'login/get_current_rank_limit/', { headers })
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
  text-align: center;
  font-size: 25px;

}
.button {
  float: right;
}
</style>
