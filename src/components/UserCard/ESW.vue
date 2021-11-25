<template>
  <div>
    <b-modal ref="success-modal" hide-footer title="Dane zapisano poprawnie" no-close-on-backdrop>
      <div class="text-center-modal">
        <i class="far fa-check-circle"></i>
      </div>
    </b-modal>
    <b-modal ref="overflow-modal" hide-footer title="Wyjście po za zakres czasu" no-close-on-backdrop>
      <p>Nie możesz nadać kary na taki okres czasu. Jeżeli chcesz kara zostanie nadana do twojego maksymalnego czasu wynikającego z uprawnień a przepełnienie wymaga zatwierdzenia przez innego administratora!</p>
      <div class="button-group">
      <b-button squared variant="success" @click="sendForm(calculateBanTimeToMinute(selected_time_to_ban.time, selected_time_to_ban.setting))">Kontynuuj</b-button>
      <b-button squared variant="danger" @click="closeFormAndModal">Anuluj</b-button>
      </div>
    </b-modal>
    <div id="add_ban_box_mask">
    </div>
    <div id="add_ban_box">
      <div id="close" @click="closeForm">
        <i class="fas fa-times"></i>
      </div>
      <h1>Dodaj karę</h1>
      <div id="switch_tab">
      <div id="first_tab">
        <b-overlay :show="status_load" rounded="sm" variant="dark" class="overlay">
        <h3>wybierz karę z listy poniżej</h3>
        <b-alert v-model="alert.selected_type" variant="dark" dismissible fade>
          Nie wybrano rodzaju kary
        </b-alert>
        <div class="entry_name">
          <p>Wprowadź nazwę kary:</p>
          <b-form-input  type="text" v-model="input_name"/>
        </div>
        <div class="table">
          <b-overlay :show="!api_loaded_table_times" rounded="sm" variant="dark" class="overlay">
              <b-table hover :fields="fields"
                       class='text-center'
                       :items="filterTableData"
                       table-variant="dark"
                       id="my-table"
                       ref="banTable"
                       select-mode="single"
                       selectable
                       @row-selected="item => {this.row_selected = item,  item.length ? getTimeRange(item[0].id) : getTimeRange(0)}"
              >
              </b-table>
          </b-overlay>
        </div>
        <div class="small_info">
          <i><b>Zaznaczyłeś:</b> {{row_selected.length ? row_selected[0].name : 'Nie zaznaczyłeś żadnej z kar'}}</i>
        </div>
        <b-button v-if="!row_selected.length" squared class="button" @click="nextStepCheck" disabled>Dalej</b-button>
        <b-button v-if="row_selected.length" squared class="button" @click="nextStepCheck">Dalej</b-button>
        <b-button squared class="button" @click="closeForm">Anuluj</b-button>
          <template #overlay>
            <div class="text-center">
              <b-icon icon="stopwatch" font-scale="1.5" animation="cylon"></b-icon>
              <p id="cancel-label" style="font-size: 12px">Ładowanie danych</p>
            </div>
          </template>
        </b-overlay>
      </div>
      <div id="timing">
        <b-alert v-model="alertAddBan.permissions" variant="danger">
          BRAK UPRAWNIEŃ
        </b-alert>
        <b-alert v-model="alertAddBan.reached_10m" variant="danger">
          OSIĄGNIĘTO LIMIT NAŁOŻENIA KARY W CIĄGU 10 MINUT
        </b-alert>
        <b-alert v-model="alertAddBan.reached_1D" variant="danger">
          OSIĄGNIĘTO LIMIT NAŁOŻENIA KARY W CIĄGU JEDNEJ DOBY
        </b-alert>
        <b-alert v-model="alertAddBan.add_time" variant="danger" dismissible>
          Nie wprowadziłeś czasu
        </b-alert>
        <b-alert v-model="alertAddBan.admin" variant="danger" dismissible>
          Nie możesz ukarać administratora !!
        </b-alert>
        <b-alert v-model="alertAddBan.ban_ignore" variant="danger" dismissible>
          Nie można nadać kary ponieważ użytkownik posiada opcję "IGNORE BAN" a ta kara nie przewiduje nadania pomimo posiadania opcji "IGNORE BAN"
        </b-alert>
        <b-alert v-model="alertAddBan.overflow" variant="danger" dismissible>
          Czas który wprowadzasz jest po za twoimi uprawnieniami.
          <br>
          Maksymalny czas który możesz wprowadzić to: {{banPermissions.max_time_to_action}}
        </b-alert>
        <b-alert v-model="alertAddBan.range_time" variant="danger" dismissible>
          Wprowadzony czas jest z poza zakresu!
          <br>
          Minimalny czas wynosi: {{time_computed(banTimeParameters.time_from, banTimeParameters.time_from_setting)}}
          <br>
          Maksymalny czas wynosi: {{time_computed(banTimeParameters.time_to,banTimeParameters.time_to_setting)}}
        </b-alert>
        <b-overlay :show="alertAddBan.permissions" rounded="sm" variant="dark" class="overlay">
        <p>Użytkownikowi {{ base_data.Nick }} zostanie nałożona kara w postaci <i>{{ banTimeParameters.action_name }}</i></p>
        <p v-if="banTimeParameters.times_all==1">Użytkownik był już karany {{ banTimeParameters.times_all }} raz. </p>
        <p v-if="banTimeParameters.times_all>=2">Użytkownik był już karany {{ banTimeParameters.times_all }} razy. </p>
        <p v-if="banTimeParameters.times_all==0">Użytkownik nie był karany. </p>
        <p v-if="banTimeParameters.times_this>=2">Za ten rodzaj był karany {{ banTimeParameters.times_this }} razy</p>
        <p v-if="banTimeParameters.times_this==1">Za ten rodzaj był karany {{ banTimeParameters.times_this }} raz</p>
        <p v-if="banTimeParameters.times_this==0 && banTimeParameters.times_all!=0">Za ten rodzaj nie był karany.</p>
        <div v-if="banTimeParameters.timing" class="entry_time">
          <p>Wprowadź czas trwania kary:</p>
          <b-form-input  type="number" v-model="selected_time_to_ban.time"/>
          <b-form-checkbox class="check_box"
                           id="checkbox-2"
                           name="checkbox-2"
                           value='minute'
                           v-model="selected_time_to_ban.setting"
          >
            Minuty
          </b-form-checkbox>
          <b-form-checkbox class="check_box"
                           id="checkbox-2b"
                           name="checkbox-2b"
                           value="day"
                           v-model="selected_time_to_ban.setting"
          >
            Dni
          </b-form-checkbox>
          <b-form-checkbox class="check_box"
                           id="checkbox-2c"
                           name="checkbox-2c"
                           value="month"
                           v-model="selected_time_to_ban.setting"
          >
            M-c
          </b-form-checkbox>
          <b-form-checkbox class="check_box"
                           id="checkbox-2d"
                           name="checkbox-2d"
                           value="perm"
                           v-model="selected_time_to_ban.setting"
          >
            Perm
          </b-form-checkbox>
        </div>
        <p v-if="banTimeParameters.timing" class="additional_info">Minimalny czas: [{{time_computed(banTimeParameters.time_from, banTimeParameters.time_from_setting)}}] || Maksymalny czas: [{{time_computed(banTimeParameters.time_to,banTimeParameters.time_to_setting)}}]</p>
        <b-button v-if="!alertAddBan.permissions" class="button" @click="checkForm">Dodaj</b-button>
        <b-button squared class="button" @click="closeForm">Anuluj</b-button>
        <template #overlay>
          <div class="text-center">
            <b-icon icon="exclamation-octagon-fill" font-scale="1.5" animation="throb"></b-icon>
            <p id="cancel-label" style="font-size: 12px">BRAK UPRAWNIEŃ</p>
          </div>
        </template>
        </b-overlay>
      </div>
    </div>
    </div>
    <div class="grid-container">
      <div class="nick">
        <InfoTabUserCard
          label="Nick"
          :content="base_data.Nick"
          icon="far fa-user"
          :status_load="api_loaded.api_base"
        />
      </div>
      <div class="dbid">
        <InfoTabUserCard
          label="DBID"
          :content="base_data.DBID"
          icon="fas fa-key"
          :status_load="api_loaded.api_base"
        />
      </div>
      <div class="uid">
        <InfoTabUserCard
          label="UID"
          :content="base_data.UID"
          icon="fas fa-fingerprint"
          :status_load="api_loaded.api_base"
          :small_content=true
        />
      </div>
      <div class="many_ban">
        <InfoTabUserCard
          label="Ilość warnów"
          content="0"
          icon="fas fa-skull-crossbones"
          :status_load=true
          :small_content=true
        />
      </div>
      <div class="points">
        <InfoTabUserCard
          label="Punkty"
          content="2500pkt"
          icon="fas fa-coins"
          :status_load=true
          :small_content=true
        />
      </div>
      <div class="add_ban" @click="showForm">
        <SearchButton
          label="Dadaj warna"
          icon="fas fa-plus-circle"
        />
      </div>
      <div class="search_box">
          input name
      </div>
      <div class="show_active">
        <SearchButton
          label="Pokaż aktywne warny"
          icon="fas fa-power-off"
        />
      </div>
      <div class="show_auto_ban">
        <SearchButton
          label="Pokaż automatyczne warny"
          icon="fas fa-magic"
        />
      </div>
      <div class="clear_filters">
        <SearchButton
          label="Wyczyść filtry"
          icon="fas fa-eraser"
          />
      </div>
      <div class="ban-history">
        <div class="header">
          Lista warnów
        </div>
        <b-overlay :show="!api_loaded_ban_history" rounded="sm" variant="dark" class="overlay">
          <b-table v-if="filterTableBanHistory.length!=0"
                   hover :fields="fields_table_ban"
                   class='text-center'
                   :items="filterTableBanHistory"
                   table-variant="dark"
                   id="my-table"
                   ref="banTable"
                   select-mode="single"
                   selectable
          >
            <template #cell(Lp)="data">
              {{ data.index + 1}}
            </template>
            <template #cell(add_time)="data">
              {{ data.item.BanHistoryTable.time_add | date_format}}
            </template>
            <template #cell(Rodzaj)="data">
              {{ data.item.ActionBanType.name}}
            </template>
            <template #cell(to_time)="data">
              {{ data.item.BanHistoryTable.time_to | date_format}}
            </template>
            <template #cell(status)="data">
              <div v-if="data.item.BanHistoryTable.active"> Aktywna</div>
            </template>
          </b-table>
          <div v-if="filterTableBanHistory.length==0" class="blank_data">
            BRAK HISTORII KAR UŻYTKOWNIKA
            <div style="font-size: 1vw" >
              Użytkownik nie był karany
            </div>
          </div>

        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
import InfoTabUserCard from './InfoTabUserCard'
import SearchButton from './SearchButton'
import axios from 'axios'
export default {
  name: 'ESW.vue',
  components: {
    InfoTabUserCard,
    SearchButton
  },
  computed: {
    filterTableData () {
      return this.table_data.filter(element => element.name.toLowerCase().includes(this.input_name.toLowerCase()))
    },
    filterTableBanHistory () {
      return this.table_ban_history_data
    }
  },
  data () {
    return {
      alert: {
        selected_type: false
      },
      alertAddBan: {
        add_time: false,
        admin: false,
        ban_ignore: false,
        overflow: false,
        permissions: false,
        range_time: false,
        reached_1D: false,
        reached_10m: false
      },
      api_loaded_table_times: false,
      api_loaded_ban_history: false,
      banPermissions: {},
      banTimeParameters: {
        action_id: 0,
        action_name: '',
        ignore_ban: false,
        time_from: 0,
        time_from_setting: '',
        time_to: 0,
        time_to_setting: '',
        times_all: 0,
        times_this: 0,
        timing: false
      },
      button_clicked: false,
      fields: [
        'Lp',
        {
          key: 'name',
          label: 'Nazwa kary'
        },
        {
          key: 'description',
          label: 'Opis kary'
        }
      ],
      fields_table_ban: [
        'Lp',
        {
          key: 'BanTable.name',
          label: 'Nazwa kary'
        },
        'Rodzaj',
        {
          key: 'add_time',
          label: 'Czas dodania kary'
        },
        {
          key: 'add_admin.Nick',
          label: 'Administrator dodający karę'
        },
        {
          key: 'to_time',
          label: 'Czas trwania kary'
        },
        {
          key: 'status',
          label: 'Status kary'
        }
      ],
      input_name: '',
      row_selected: [],
      selected_time_to_ban: {
        time: 1,
        setting: ''
      },
      status_load: false,
      table_data: [],
      table_ban_history_data: []
    }
  },
  filters: {
    date_format: function (value) {
      if (!value) return ''
      const date = new Date(value * 1000)
      const convert = a => (a < 10) ? '0' + a : a
      return (convert(date.getDate()) + '-' + convert(date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + convert(date.getHours()) + ':' + convert(date.getMinutes()) + ':' + convert(date.getSeconds()))
    }
  },
  methods: {
    calculateBanTimeToMinute (time, formatter) {
      if (formatter === '' || time === 0) return 0
      if (formatter === 'minute') return time
      if (formatter === 'perm') return -1
      if (formatter === 'day') return time * 24 * 60
      if (formatter === 'month') return time * 24 * 60 * 30
    },
    checkForm () {
      if (this.banPermissions.add === false) {
        this.alertAddBan.permissions = true
        setTimeout(this.closeForm, 3000)
      } else {
        if (this.button_clicked === false) {
          if (!this.banTimeParameters.ignore_ban || this.row_selected[0].skip_grant) {
            this.alertAddBan.ban_ignore = false
            if (this.banTimeParameters.timing) {
              if (this.selected_time_to_ban.time === 0 || this.selected_time_to_ban.setting === '' || this.selected_time_to_ban.setting === false) {
                this.alertAddBan.add_time = true
              } else {
                this.alertAddBan.add_time = false
                const time = this.calculateBanTimeToMinute(this.selected_time_to_ban.time, this.selected_time_to_ban.setting)
                const from = this.calculateBanTimeToMinute(this.banTimeParameters.time_from, this.banTimeParameters.time_from_setting)
                const to = this.calculateBanTimeToMinute(this.banTimeParameters.time_to, this.banTimeParameters.time_to_setting)
                if (from !== -1 && to !== -1) {
                  if (time >= from && time <= to) {
                    this.alertAddBan.range_time = false
                    this.alertAddBan.overflow = false
                    console.log('w zakresie')
                    console.log(time + '||' + from + '||' + to)
                    this.alertAddBan.ban_ignore = false
                    if (this.banPermissions.max_time_to_action === -1 || this.banPermissions.max_time_to_action >= time) {
                      this.sendForm(time)
                    } else {
                      if (this.banPermissions.overflow) {
                        this.$refs['overflow-modal'].show()
                        this.alertAddBan.overflow = false
                      } else this.alertAddBan.overflow = true
                    }
                  } else this.alertAddBan.range_time = true
                }
                if (from !== -1 && to === -1) {
                  console.log('do perma od 0')
                  console.log(time + '||' + from + '||' + to)
                  if (time >= from || time === -1) {
                    this.alertAddBan.range_time = false
                    this.alertAddBan.overflow = false
                    console.log('w zakresie')
                    this.alertAddBan.ban_ignore = false
                    if (this.banPermissions.max_time_to_action === -1 || (this.banPermissions.max_time_to_action >= time && time !== -1)) {
                      this.sendForm(time)
                    } else {
                      if (this.banPermissions.overflow) {
                        this.$refs['overflow-modal'].show()
                        this.alertAddBan.overflow = false
                      } else this.alertAddBan.overflow = true
                    }
                  } else this.alertAddBan.range_time = true
                }
                if (from === -1 && to === -1) {
                  console.log('do perma od perm')
                  console.log(time + '||' + from + '||' + to)
                  if (time === -1) {
                    this.alertAddBan.range_time = false
                    this.alertAddBan.overflow = false
                    console.log('w zakresie')
                    this.alertAddBan.ban_ignore = false
                    if (this.banPermissions.max_time_to_action === -1) {
                      this.sendForm(time)
                    } else {
                      if (this.banPermissions.overflow) {
                        this.$refs['overflow-modal'].show()
                        this.alertAddBan.overflow = false
                      } else this.alertAddBan.overflow = true
                    }
                  } else this.alertAddBan.range_time = true
                }
              }
            } else this.sendForm(0)
          } else {
            this.alertAddBan.ban_ignore = true
          }
        }
      }
    },
    closeForm () {
      document.getElementById('add_ban_box').style.opacity = '0'
      document.getElementById('add_ban_box').style.visibility = 'hidden'
      document.getElementById('add_ban_box').style.transform = 'translate(-50%, -200%)'
      document.getElementById('add_ban_box_mask').style.visibility = 'hidden'
      document.getElementById('add_ban_box_mask').style.opacity = '0'
      setTimeout(this.closeFormDelay, 300)
      this.$refs.banTable.clearSelected()
      this.row_selected = []
      this.alert.selected_type = false
    },
    closeFormAndModal () {
      this.$refs['overflow-modal'].hide()
      this.closeForm()
      this.$refs['success-modal'].hide()
    },
    closeFormDelay () {
      document.getElementById('first_tab').style.transform = 'translateX(0%)'
      document.getElementById('first_tab').style.opacity = '1'
      document.getElementById('first_tab').style.display = 'block'
      document.getElementById('timing').style.transform = 'translateX(100%)'
      document.getElementById('timing').style.opacity = '0'
      this.status_load = false
      this.button_clicked = false
      this.banTimeParameters = {
        action_id: 0,
        action_name: '',
        time_from: 0,
        time_from_setting: '',
        time_to: 0,
        time_to_setting: '',
        times_all: 0,
        times_this: 0,
        timing: false
      }
      this.alertAddBan = {
        add_time: false,
        admin: false,
        ban_ignore: false,
        overflow: false,
        permissions: false,
        range_time: false,
        reached_1D: false,
        reached_10m: false
      }
      this.selected_time_to_ban = {
        time: 1,
        setting: ''
      }
    },
    getBanTableData () {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.api_loaded_table_times = false
      this.api_loaded_ban_history = false
      // TODO filtred ban
      axios.get(this.$store.state.path_to_server + 'bans/get_ban_table/', { headers })
        .then(response => {
          this.table_data = response.data
          this.api_loaded_table_times = true
        })
      axios.get(this.$store.state.path_to_server + 'bans/get_ban_history/' + this.$route.params.dbid, { headers })
        .then(response => {
          this.table_ban_history_data = response.data
          this.api_loaded_ban_history = true
        })
    },
    getTimeRange (selectedBanId) {
      console.log(selectedBanId)
    },
    nextStep () {
      document.getElementById('first_tab').style.transform = 'translateX(-100%)'
      document.getElementById('first_tab').style.opacity = '0'
      setTimeout(() => { document.getElementById('first_tab').style.display = 'none' }, 300)
      setTimeout(() => { document.getElementById('timing').style.transform = 'translateX(0%)' }, 300)
      setTimeout(() => { document.getElementById('timing').style.opacity = '1' }, 300)
    },
    nextStepCheck () {
      this.alert.selected_type = false
      if (this.row_selected.length === 0) this.alert.selected_type = true
      else {
        const payload = {
          ban_id: this.row_selected[0].id,
          dbid: this.base_data.DBID
        }
        const headers = {
          'Content-Type': 'application/json'
        }
        this.status_load = true
        axios.put(this.$store.state.path_to_server + 'bans/get_ban_add_parameters_to_add/', payload, { headers })
          .then(response => {
            this.banTimeParameters = response.data
            const payload = {
              action_id: response.data.action_id
            }
            axios.put(this.$store.state.path_to_server + 'bans/get_action_permission/', payload, { headers })
              .then(response => {
                this.banPermissions = response.data
                this.status_load = false
                this.nextStep()
              })
          })
      }
    },
    sendForm (time) {
      this.button_clicked = true
      console.log('da sie')
      const payload = {
        ban_client_dbid: this.base_data.DBID,
        ban_id: this.row_selected[0].id,
        action_id: this.banPermissions.action_ban_id,
        additional_info: 'OK',
        time: time
      }
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.put(this.$store.state.path_to_server + 'bans/add_ban/', payload, { headers })
        .then(response => {
          if (response.status === 200) {
            this.$refs['success-modal'].show()
            this.getBanTableData()
            setTimeout(this.closeFormAndModal, 3000)
          }
        })
        .catch(error => {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
          this.$refs['overflow-modal'].hide()
          if (error.response.data.detail === 'Reached day limit') {
            this.alertAddBan.reached_1D = true
            setTimeout(this.closeForm, 3000)
          }
          // TODO ERROR CODE
          if (error.response.data.detail === 'Reached 10m limit') {
            this.alertAddBan.reached_10m = true
            setTimeout(this.closeForm, 3000)
          }
          console.log(error.response.data.detail)
        })
    },
    showForm () {
      document.getElementById('add_ban_box').style.visibility = 'visible'
      document.getElementById('add_ban_box_mask').style.visibility = 'visible'
      document.getElementById('add_ban_box_mask').style.opacity = '50%'
      document.getElementById('add_ban_box').style.opacity = '1'
      document.getElementById('add_ban_box').style.transform = 'translate(-50%, -50%)'
    },
    time_computed (time, formatter) {
      // TODO Formatter
      if (time === 0) return 'bez limitu'
      if (time === -1) return 'permanent'
      if (formatter === 'minute') {
        if (time === 1) return '1 minuta'
        if (time > 1 && time < 5) return time + ' minuty'
        if (time >= 5) return time + ' minut'
      }
      if (formatter === 'day') {
        if (time === 1) return '1 dzień'
        if (time > 1) return time + ' dni'
      }
      if (formatter === 'month') {
        if (time === 1) return '1 miesiąc'
        if (time > 1 && time < 5) return time + ' miesiące'
        if (time >= 5) return time + ' miesięcy'
      }
      const text = time + formatter
      return (text)
    }
  },
  mounted () {
    this.getBanTableData()
  },
  props: {
    api_loaded: null,
    base_data: null
  }
}
</script>

<style scoped lang="scss">
@import "style";
.text-center-modal {
  text-align: center;
  font-size: 2vw;
}
.grid-container {
  display: grid;
  font-family: 'Itim', cursive;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: auto;
  grid-gap: 10px;
  background-color: #3b4650;
  padding: 10px;
  border-radius: 8px;
}
.grid-container > div {
  background-color: #242424;
  border-radius: 8px;
  overflow: hidden;
}
.uid {
  grid-column-start: 3;
  grid-column-end: 5;
}
.ban-history {
  grid-column-start: 1;
  grid-column-end: 7;
}
.search_box {
  grid-column-start: 2;
  grid-column-end: 4;
}
#add_ban_box {
  color: #f8f8ff;
  font-family: 'Itim', cursive;
  z-index: 10;
  background-color: #323944;
  width: 60%;
  height: 65%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -200%);
  border-radius: 8px;
  padding: 20px;
  visibility: hidden;
  opacity: 0;
  -webkit-transition: transform 300ms, visibility 300ms linear 0ms, opacity 300ms;
}
#add_ban_box_mask {
  z-index: 9;
  opacity: 50%;
  background-color: black;
  position: fixed;
  visibility: hidden;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: visibility 300ms, opacity 300ms;
}
#close {
  float: right;
  color: off-white/light grey;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  transition: color 300ms;
}
#close:hover {
  color: #454d55;
  cursor: pointer;
}
#add_ban_box h1 {
  font-size: 2.8vw;
  color: #ffc107;
}
#add_ban_box h3 {
  font-size: 1vw;
  color: #E87538;
}
.table {
  max-height: 300px;
  overflow: auto;
  margin-bottom: 0 !important;
}
.small_info {
  color: #E87538;
  font-size: 1vw;
}
.entry_name {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
}
.entry_name p {
  width: max-content;
  margin-bottom: 0;
  margin-right: 5px;
  font-size: 1.5vw;
}
.entry_name input {
  width: 40%;
  float: left;
}
.entry_time {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
}
.entry_time p {
  margin-bottom: 0;
  width: max-content;
  font-size: 1.5vw;
  margin-right: 5px;
}
.entry_time input {
  width: 15%;
  margin-right: 5px;
}
.entry_time .check_box {
  margin-right: 10px;
}
.entry_time .check_box + p {
  font-size: 0.9vw;
}
#first_tab {
  width: 100%;
  position: relative;
  visibility: visible;
  -webkit-transition: transform 300ms, display 300ms, opacity 300ms;
}
#timing {
  position: relative;
  transform: translateX(100%);
  opacity: 0;
  -webkit-transition: transform 300ms, display 300ms, opacity 300ms;
}
.button {
  float: right;
  margin-right: 5px;
}
.additional_info {
  color: #E87538;
  font-size: 1vw;
}
.button-group {
  float: right;
}
.button-group button{
  margin-left: 8px;
}
.blank_data {
  padding: 10px;
  text-align: center;
  font-size: 1.8vw;
}
</style>
