<template>
  <b-overlay :show="!api_loaded" rounded="sm" variant="dark" class="overlay">
    <div class="main">
      <div class="header">
        Informacje o czasie połączeń
      </div>
      <div v-if="!api_loaded" class="temp"></div>
      <apexchart v-if="api_loaded" ref="Ping_chart" width="80%" height="500" type="donut" :options="options" :series="series"></apexchart>
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
  name: 'TimingTab_UserCard',
  mounted () {
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .get(this.$store.state.path_to_server + 'staff/get_user_info_timing/' + this.$route.params.dbid, { headers })
      .then(response => {
        this.series = [response.data.TIME_ONLINE, response.data.TIME_IDLE, response.data.TIME_AWAY, response.data.TIME_MIC_DISABLED]
        this.api_loaded = true
      })
  },
  data () {
    return {
      api_loaded: false,
      series: [0, 0, 0, 0],
      options: {
        labels: ['Czas on-line', 'Czas idle', 'Czas away', 'Czas disabled'],
        chart: {
          type: 'donut'
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Suma'
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
.temp {
  height: 250px;
}
</style>
