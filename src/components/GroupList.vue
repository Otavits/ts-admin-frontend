<template>
  <div id="container">
    <div id="containers" v-for="(item, index) in rank_data" v-bind:key="index">
      <div class="list_element">
      <div class="element">
        <img class="icon" :src="$store.state.path_to_server + 'public/icon/'+item.path">
      </div>
      <div class="element2">
        {{ item.rankName }}
      </div>
      <div class="element">
          <b-form-checkbox
          v-if="selected_group.indexOf(item.groupId) === -1"
          :id=item.rankName
          v-model="selected_group"
          :name=item.rankName
          :value=item.groupId
          :unchecked-value=null
          :disabled="reach_limit"
        >
        </b-form-checkbox>
        <b-form-checkbox
          v-if="selected_group.indexOf(item.groupId) !== -1"
          :id=item.rankName
          v-model="selected_group"
          :name=item.rankName
          :value=item.groupId
          :unchecked-value=null
        >
        </b-form-checkbox>
      </div>
      <br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GroupList',
  props: {
    rank_group: null,
    reach_limit: null
  },
  data () {
    return {
      rank_data: null,
      selected_group: [],
      selected_group_old: []
    }
  },
  mounted () {
    const headers = {
      'Content-type': 'application/json'
    }
    const dd = this.rank_current_list
    console.log(dd)
    axios
      .get(this.$store.state.path_to_server + 'game-rank/rank-games-list/' + this.rank_group, { headers })
      .then(response => {
        this.rank_data = response.data
      })
    axios
      .get(this.$store.state.path_to_server + 'game-rank/current-rank-array-to-initialize/' + this.rank_group, { headers })
      .then(response => {
        this.selected_group = response.data
      })
  },
  updated () {
    if (this.selected_group.length > this.selected_group_old.length) {
      for (let i = 0; i < this.selected_group.length; i++) {
        if (this.selected_group_old.indexOf(this.selected_group[i]) === -1) {
          this.$emit('selected_element', this.selected_group[i])
        }
      }
      this.selected_group_old = this.selected_group
    }
    if (this.selected_group.length < this.selected_group_old.length) {
      for (let i = 0; i < this.selected_group_old.length; i++) {
        if (this.selected_group.indexOf(this.selected_group_old[i]) === -1) {
          this.$emit('remove_element', this.selected_group_old[i])
        }
      }
      this.selected_group_old = this.selected_group
    }
  }
}
</script>

<style scoped>
#content {
  text-align: center;
}
#container {
  display: block;
}
.element {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  right: 0;
  align-items: center;
}
.element2 {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  font-size: 25px;
  right: 0;
  width: 220px;
  align-items: center;
}
#containers {
  justify-content: center;
  display: flex;
  align-items: center;
}
.icon {
  width: 4rem;
  height: 4rem;
}
.checkbox {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-block;
  right: 0;
  align-items: center;
}
.list_element {
  background-color: #242424;
  border-radius: 25px;
  padding: 2px 10px;
  margin-top: 5px;
  justify-content: center;
  display: flex;
  align-items: center;
  color: white;
  font-family: 'Itim', cursive;
}
</style>
