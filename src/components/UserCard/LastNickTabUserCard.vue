<template>
  <b-overlay :show="api_loadaed" rounded="sm" variant="dark" class="overlay">
    <div class="main">
      <div class="header">
        Historia ostatnich nicków
      </div>
      <div class="table">
        <b-table hover :fields="fields"
                 :items="table_data"
                 table-variant="dark"
                 id="my-table"
        >
          <template #cell(date_change)="data">
            {{ data.item.date_change | date_format}}
          </template>
        </b-table>
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
import axios from 'axios'

export default {
  name: 'LastNickTab_UserCard.vue',
  data () {
    return {
      api_loadaed: false,
      table_data: [],
      fields: [
        {
          key: 'nick',
          label: 'Nick',
          sortable: true
        },
        {
          key: 'date_change',
          label: 'Data zmiany',
          sortable: true
        },
        {
          key: 'status',
          label: 'Uwagi',
          sortable: true
        }
      ]
    }
  },
  mounted () {
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .get(this.$store.state.path_to_server + 'staff/get_user_history_last_5_nick/' + this.$route.params.dbid, { headers })
      .then(response => {
        this.table_data = response.data
        this.api_loaded = true
      })
  },
  filters: {
    date_format: function (value) {
      if (!value) return ''
      const date = new Date(value * 1000)
      const convert = a => (a < 10) ? '0' + a : a
      return (convert(date.getDate()) + '-' + convert(date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + convert(date.getHours()) + ':' + convert(date.getMinutes()) + ':' + convert(date.getSeconds()))
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
.table {
  padding: 0px 40px;
}
</style>
