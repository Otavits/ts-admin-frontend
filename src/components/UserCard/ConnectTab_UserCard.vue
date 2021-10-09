<template>
  <b-overlay :show="!status_load" rounded="sm" variant="dark" class="overlay">
    <div class="main">
      <div class="header">
        Informacje o połączeniach
      </div>
      <div class="box">
        <div class="element">
          <div class="label">
            Data pierwszego połączenia:
          </div>
          <div class="value">
            {{ info_data.created |date_format }}
            <br>
            {{ diff_first }}
          </div>
        </div>
        <div class="element">
          <div class="label">
            Data ostatniego połączenia:
          </div>
          <div class="value">
            {{ info_data.last_connect | date_format }}
            <br>
            {{ diff_last }}
          </div>
        </div>
        <div class="element">
          <div class="label">
            Ilość połączeń:
          </div>
          <div class="value">
            {{ info_data.total_connections }}
          </div>
        </div>
        <div class="element">
          <div class="label">
            Ilość połączeń realnych:
          </div>
          <div class="value">
            {{ info_data.real_total_connections }}
          </div>
        </div>
        <div class="element">
          <div class="label">
            Konto myteamsepak:
          </div>
          <div class="value">
            <div v-if="info_data.myteamspeak_id!==''">Tak</div>
            <div v-if="info_data.myteamspeak_id===''">Nie</div>
          </div>
        </div>
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
export default {
  name: 'ConnectTab_UserCard.vue',
  props: {
    info_data: {
      id: null,
      DBID: null,
      total_connections: null,
      real_total_connections: null,
      created: null,
      last_connect: null,
      myteamspeak_id: null,
      description: null
    },
    status_load: null
  },
  filters: {
    date_format: function (value) {
      if (!value) return ''
      const date = new Date(value * 1000)
      const convert = a => (a < 10) ? '0' + a : a
      return (convert(date.getDate()) + '-' + convert(date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + convert(date.getHours()) + ':' + convert(date.getMinutes()) + ':' + convert(date.getSeconds()))
    }
  },
  computed: {
    diff_last () {
      return (this.compute_diff(this.info_data.last_connect))
    },
    diff_first () {
      return (this.compute_diff(this.info_data.created))
    }
  },
  methods: {
    compute_diff (a) {
      let text = ''
      let TextMinute = ''
      let TextHour = ''
      let diff = parseInt(Date.now() / 1000 - a)
      if (diff < 60) {
        text = diff + ' sekund'
      }
      if (diff < 5) {
        text = diff + ' sekundy'
      }
      if (diff === 1) {
        text = diff + ' sekundę'
      }
      if (diff >= 60) {
        diff = diff / 60
        diff = parseInt(diff)
      }
      if (diff < 60) {
        text = diff + ' minut'
      }
      if (diff < 5) {
        text = diff + ' minuty'
      }
      if (diff === 1) {
        text = diff + ' minutę'
      }
      let hour = diff / 60
      hour = parseInt(hour)
      if (diff >= 60) {
        diff = diff - (hour * 60)
        text = hour + ':' + diff
        if (diff < 60) {
          TextMinute = diff + ' minut'
        }
        if (diff < 5) {
          TextMinute = diff + ' minuty'
        }
        if (diff === 1) {
          TextMinute = diff + ' minutę'
        }
        if (diff === 0) {
          TextMinute = ''
        }
        if (hour < 60) {
          TextHour = hour + ' godzin '
        }
        if (hour < 5) {
          TextHour = hour + ' godziny '
        }
        if (hour === 1) {
          TextHour = hour + ' godzinę '
        }
        text = TextHour + TextMinute
        let day = hour / 24
        day = parseInt(day)
        if (hour >= 24) {
          hour = hour - (24 * day)
          text = day + ':' + hour
          let TextDay = day + ' dni'
          if (day === 1) {
            TextDay = day + ' dzień'
          }
          if (day < 4) {
            if (hour < 60) {
              TextHour = hour + ' godzin '
            }
            if (hour < 5) {
              TextHour = hour + ' godziny '
            }
            if (hour === 1) {
              TextHour = hour + ' godzinę '
            }
          }
          text = TextDay + ' ' + TextHour
        }
      }
      return ('[' + text + ' temu]')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
.box {
  padding: 10px 40px;
  font-size: 1.1vw;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.element {
  display: flex;
  align-items:center;
  margin-top: 5px;
}
.element .label {
  width: 15vw;
}
</style>
