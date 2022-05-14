<template>
  <div>
    <div id="main_content">
      <br>
      <b-table class="table" :fields="fields" :items="table_data" :hover="true" @row-clicked="rowclick">
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
      <div id="footer-right">
        <router-link :to="{ name: 'rankform', params: { type: 'rank_games', action: 'add', id: 0 , name_rank: 'null', group_id: 'null', path: 'null', misc: data.groupName, sort_id: 'null' }}"><b-button variant="success">Dodaj Rangę</b-button></router-link>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    data: null
  },
  data () {
    return {
      table_data: null,
      fields: ['index', { key: 'rankName', label: 'Nazwa rangi' }, { key: 'groupId', label: 'Id grupy' },
        { key: 'sortId', label: 'Sort ID' }, { key: 'path', label: 'Ścieżka do ikony' }]
    }
  },
  mounted () {
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .get(this.$store.state.path_to_server + 'game-rank/rank-games-list/' + this.data.groupName, { headers })
      .then(response => { this.table_data = response.data })
  },
  methods: {
    rowclick (item, index, event) {
      this.$router.push({ name: 'rankform', params: { type: 'rank_games', action: 'modify', id: item.id, name_rank: item.rankName, group_id: item.groupId, path: item.path, misc: item.groupName, sort_id: item.sortId } })
    }
  },
  name: 'TableGameRank.vue'
}
</script>

<style scoped>
.table {
  background: #fefefe;
  max-width: 1000px;
}
#footer-right {
  align-items: center;
  position: relative;
  display: inline;
  float: right;
}
</style>
