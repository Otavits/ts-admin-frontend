<template>
        <div id="main_content">
          <b-jumbotron class="jumbo-main">
            <b-container class="bv-example-row" fluid="true">
              <b-row>
                <b-col cols="6" md="4">
                  <b-card class="card" text-variant="white" title=" Ping Serwera" >
                    <b-card-text class="in-content">
                      <div id="in-content2">
                      <i class="fas fa-stopwatch"></i> {{ current_stats.ping | ping }} ms
                      </div>
                      <div id="chart">
                        <apexchart ref="Ping_chart" width="80%" height="100" type="area" :options="options" :series="series_Ping"></apexchart>
                      </div>
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col cols="6" md="4">
                  <b-card class="card" text-variant="white" title="Ilość Osób on-line">
                    <b-card-text class="in-content">
                      <div id="in-content2">
                        <i class="fas fa-user-friends"></i> {{ current_stats.current_user }}
                      </div>
                      <div id="chart">
                        <apexchart ref="User_chart" width="80%" height="100" type="area" :options="options" :series="series"></apexchart>
                      </div>
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col cols="6" md="4">
                  <b-card class="card" text-variant="white" title="Pack-lost">
                    <b-card-text class="in-content">
                      <div id="in-content2">
                        <i class="fas fa-assistive-listening-systems"></i> {{ current_stats.pack_loss | pack_loss}} %
                      </div>
                      <div id="chart">
                        <apexchart ref="Pack_chart" width="80%" height="100" type="area" :options="options" :series="series"></apexchart>
                      </div>
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
              <br>
              <b-row>
                <b-col cols="12" md="8" align-self="stretch">
                  <b-card class="card" text-variant="white" title="Wiadomości">
                    <b-card-text>
                      <div >
                        <div v-for="(component, index) in message_id" v-bind:key="index">
                          <message class="message"
                            :message_id="component"
                          />
                        </div>
                      </div>
                    </b-card-text>
                  </b-card>
                </b-col>
                <b-col cols="6" md="4" align-self="stretch">
                  <b-card class="card" text-variant="white" title="Nadchodzące wydarzenia">
                    <b-card-text>
                      <div >
                        <div v-for="(component, index) in message_id" v-bind:key="index">
                          <message class="message"
                                   :message_id="component"
                          />
                        </div>
                      </div>
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
            </b-container>
          </b-jumbotron>
          <p class="class">Wersja systemu V-1b, system w fazie rozwoju.</p>
        </div>
</template>

<script>
import message from '../components/message'
import axios from 'axios'
export default {
  components: {
    message
  },
  data () {
    return {
      current_stats: {
        ping: 0,
        current_user: 0,
        pack_loss: 0
      },
      stats: {
        ping: 0,
        current_user: 0,
        pack_loss: 0
      },
      message_id: [1, 5, 65, 4554, 14556],
      options: {
        fill: {
          colors: '#ffc107',
          opacity: 1,
          type: 'gradient',
          gradient: {
            type: 'vertical',
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 0
          }
        },
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: true,
          intersect: false,
          inverseOrder: false,
          custom: undefined,
          fillSeriesColor: false,
          theme: 'dark',
          style: {
            fontSize: '10px',
            fontFamily: undefined
          },
          onDatasetHover: {
            highlightDataSeries: false
          },
          x: {
            show: false,
            format: 'dd MMM',
            formatter: undefined
          },
          y: {
            formatter: undefined,
            title: {
              formatter: (seriesName) => seriesName
            }
          },
          z: {
            formatter: undefined,
            title: 'Size: '
          },
          marker: {
            show: false
          },
          items: {
            display: 'flex'
          },
          fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0
          }
        },
        chart: {
          background: '#2e3944',
          toolbar: {
            show: false
          },
          selection: {
            enabled: false
          },
          zoom: {
            enabled: false
          }
        },
        xaxis: {
          categories: ['1d', '12h', '5h', '2h', '1h', '30m', '10m', '10s'],
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          show: false,
          crosshairs: {
            show: false
          }
        },
        grid: {
          show: false
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#ffc107',
            shadeTo: 'light',
            shadeIntensity: 0.65
          }
        },
        dataLabels: {
          enabled: true
        },
        annotations: {
          position: 'back'
        }
      },
      series: [{
        name: 'Ping',
        data: []
      }],
      series_Ping: [{
        name: 'Ping',
        data: []
      }],
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            }
          }
        }
      ]
    }
  },
  methods: {
    loadCurrentInfo: function () {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios
        .get(this.$store.state.path_to_server + 'public/last_stats/', { headers })
        .then(response => {
          this.current_stats = response.data
        })
    },
    loadInfo: function () {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios
        .get(this.$store.state.path_to_server + 'public/stats/', { headers })
        .then(response => {
          this.$refs.Ping_chart.updateSeries([{
            name: 'Ping',
            data: response.data.ping
          }])
          this.$refs.User_chart.updateSeries([{
            name: 'Użytkownicy',
            data: response.data.current_user
          }])
          this.$refs.Pack_chart.updateSeries([{
            name: 'Pack-loss',
            data: response.data.pack_loss
          }])
        })
    },
    load_data: function () {
      this.loadInfo()
      this.loadCurrentInfo()
    }
  },
  created () {
    this.loadCurrentInfo()
    this.loadInfo()
    this.interval = setInterval(() => this.load_data(), 3000)
  },
  destroyed () {
    clearInterval(this.interval)
  },
  filters: {
    ping: function (value) {
      return Math.round(value)
    },
    pack_loss: function (value) {
      return value.toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
*, *::before, *::after {
  float: none;
}
#main {
    background-color:#3b4650;
}
#main_content {
    text-align: left;
    padding-right: 10px;
    float: left;
    color: black;
    margin-top: 10px;
    width:100%;
    overflow: auto;

}
.card {
  background-color: #2e3944;
  height: 100%;
}
.jumdbo-main {
  padding: 0px;
  background-color: #2e3944;
}
.jumbotron {
  background-color: #3b4650;
}
.bv-example-row {
  margin: 0px;
}
.in-content {
  width: 100%;
  padding: 0;
  margin: 0;
  font-size: 25px;
  display: inline-block;
}
#in-content2  {
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translatey(-50%);

}
#chart {
  display: inline-block;
  float: right;
}

.apexcharts-tooltip {
  color: #f0ff !important;
  transform: translateX(10px) translateY(10px);
  overflow: visible !important;
  white-space: normal !important;
}

#chart .apexcharts-tooltip span {
  padding: 50px 10px;
  display: inline-block;
}
.message {
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
