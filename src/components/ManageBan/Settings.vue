<template>
  <div id="main_content">
    <div class="main">
      <b-modal id="add-type-ban"
               v-model="show_form"
               size="lg"
               centered no-close-on-backdrop
               title="Dodaj karę moderacyjną"
               header-bg-variant="dark"
               header-text-variant="light"
               body-bg-variant="dark"
               body-text-variant="light"
               footer-bg-variant="dark"
               footer-text-variant="light"
               @hidden="resetForm"
      >
        <b-alert v-model="alert.name" variant="dark" dismissible fade>
          Nie wprowadzono nazwy kary
        </b-alert>
        <b-alert v-model="alert.action" variant="dark" dismissible fade>
          Nie wybrano rodzaju akcji
        </b-alert>
        <b-alert v-model="alert.rank_id" variant="dark" dismissible fade>
          Nie wprowadzono id rangi
        </b-alert>
        <b-alert v-model="alert.check_id" variant="dark" dismissible fade>
          Nie sprawdzono id rangi
        </b-alert>
        <div class="add-type-ban">
          <div class="element">
            <p>Wpisz nazwę:</p>
            <b-form-input type="text" placeholder="Wprowadź nazwę kary"
                          v-model="payload.name"
            ></b-form-input>
          </div>
          <div class="element">
            <p>Wybierz rodzaj akcji</p>
            <select class="list_type" v-model="payload.action">
              <option v-for="(option, index) in type_options" v-bind:value="option.value" :key="index">
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="element" v-if="payload.action==='add_server_group'">
            <p>Wprowadź id grupy</p>
            <b-form-input type="number" v-model="payload.group_id" placeholder="Wprowadź id grupy" @change="checked_name_rank=false, payload.group_name = ''"></b-form-input>
          </div>
          <div class="element" v-if="payload.action==='add_server_group'">
            <p>Sprawdzenie poprawności wprowadzonego id</p>
            <div class="check_button">
              <b-button squared class="button" @click="checkNameRank"><div v-html="buttonName"></div></b-button>
            </div>
          </div>
          <div class="element" v-if="payload.action==='add_server_group'">
            <p>Nazwa rangi na teamspeak'u</p>
            <div>
              <b-form-input type="text" disabled v-model="payload.group_name" ></b-form-input>
            </div>
          </div>
        </div>
        <template #modal-footer="{ cancel }">
          <b-button size="sm" variant="danger" @click="cancel()">
            Anuluj
          </b-button>
          <b-button v-if="payload.id!=0" size="sm" variant="danger" @click="deleteAction">
            USUŃ
          </b-button>
          <b-button class="button" size="sm" @click="sendForm">
            <div v-if="payload.id==0">OK</div>
            <div v-if="payload.id!=0">ZAPISZ</div>
          </b-button>
        </template>
      </b-modal>
      <div class="header">
        Ustawienia systemu kar
      </div>
      <b-overlay :show="!apiLoadedSettings" rounded="sm" variant="dark" class="overlay">
        <div class="box">
          <div class="element">
            <div class="label">
              System aktywny
            </div>
            <div class="parameter">
              <b-form-checkbox v-model="settings.active" name="check-button" switch @change="sendCurrentSettings"/>
            </div>
          </div>
          <div class="element">
            <div class="label">
              System auto-banów
            </div>
            <div class="parameter">
              <b-form-checkbox v-model="settings.auto_ban" name="check-button" switch @change="sendCurrentSettings"/>
            </div>
          </div>
          <div class="element">
            <div class="label">
              Weryfikacja 2-etapowa dla niektórych kar
            </div>
            <div class="parameter">
              <b-form-checkbox v-model="settings.two_factor" name="check-button" switch @change="sendCurrentSettings"/>
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
      <div class="header">
        Kary moderacyjne
      </div>
      <b-overlay :show="!apiLoaded" rounded="sm" variant="dark" class="overlay">
        <div class="table">
          <b-table hover :fields="fields"
                   :items="tableData"
                   table-variant="dark"
                   id="my-table"
                   @row-clicked="rowClick"
          >
            <template #cell(action)="data">
              {{actionType(data.item.action)}}
            </template>
            <template #cell(group_id)="data">
              <div v-if="data.item.group_id!==0">{{data.item.group_id}}</div>
            </template>
          </b-table>
        </div>
      </b-overlay>
      <b-button squared class="button" @click="show_form = !show_form">Dodaj</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Settings.vue',
  data () {
    return {
      checked_name_rank: false,
      show_form: false,
      payload: {
        id: 0,
        name: '',
        group_id: 0,
        action: null,
        time: false,
        group_name: ''
      },
      alert: {
        name: false,
        action: false,
        rank_id: false,
        check_id: false
      },
      settings: {
        active: null,
        auto_ban: null,
        two_factor: null
      },
      tableData: null,
      apiLoaded: false,
      apiLoadedSettings: false,
      test: null,
      fields: [
        {
          key: 'name',
          label: 'Nazwa'
        },
        {
          key: 'action',
          label: 'Rodzaj akcji'
        },
        {
          key: 'group_id',
          label: 'Id grupy'
        }
      ],
      type_options: [
        { value: 'null', text: 'Wybierz rodzaj akcji' },
        { value: 'ban', text: 'Ban' },
        { value: 'kick_channel', text: 'Wyrzuć z kanału' },
        { value: 'kick_server', text: 'Wyrzuć z serwera' },
        { value: 'add_server_group', text: 'Dodaj rangę' }
      ]
    }
  },
  mounted () {
    this.getTableData()
    this.getSettings()
  },
  methods: {
    actionType (data) {
      let tempData = this.type_options
      tempData = tempData.filter(item => item.value.includes(data))
      return tempData[0].text
    },
    deleteAction () {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.delete(this.$store.state.path_to_server + 'bans/delete_ban_action_type/', { data: this.payload }, { headers })
      this.show_form = false
      this.getTableData()
    },
    getSettings () {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.apiLoadedSettings = false
      axios.get(this.$store.state.path_to_server + 'bans/get_current_settings/', { headers })
        .then(response => {
          this.settings = response.data
          this.apiLoadedSettings = true
        })
    },
    getTableData () {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.apiLoaded = false
      axios.get(this.$store.state.path_to_server + 'bans/get_ban_action_type/', { headers })
        .then(response => {
          this.tableData = response.data
          this.apiLoaded = true
        })
    },
    resetForm () {
      this.payload = {
        name: '',
        group_id: 0,
        action: null,
        time: false,
        group_name: '',
        id: 0
      }
      this.alert = {
        name: false,
        action: false,
        rank_id: false,
        check_id: false
      }
    },
    sendCurrentSettings () {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.put(this.$store.state.path_to_server + 'bans/update_settings/', this.settings, { headers })
    },
    sendForm () {
      this.alert = {
        name: true,
        action: true
      }
      if (this.payload.name !== '') {
        this.alert.name = false
      }
      if (this.payload.action !== null && this.payload.action !== 'null') {
        this.alert.action = false
      }
      if (this.payload.action !== 'add_server_group') this.payload.group_id = 0
      if (this.payload.action === 'add_server_group' && parseInt(this.payload.group_id) === 0) this.alert.rank_id = true
      else this.alert.rank_id = false
      if (this.payload.action === 'add_server_group' && parseInt(this.payload.group_id) !== 0 && this.checked_name_rank === false) this.alert.check_id = true
      else this.alert.check_id = false
      if (this.payload.action === 'add_server_group' || this.payload.action === 'ban') this.payload.time = true
      else this.payload.time = false
      if (this.alert.name === false && this.alert.action === false && this.alert.rank_id === false && this.alert.check_id === false) {
        const headers = {
          'Content-Type': 'application/json'
        }
        axios.put(this.$store.state.path_to_server + 'bans/put_data_ban_action_type/', this.payload, { headers })
        this.show_form = false
        this.getTableData()
      }
    },
    rowClick (item, index, event) {
      this.show_form = true
      this.payload = item
    },
    checkNameRank () {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.checked_name_rank = false
      this.payload.group_name = ''
      if (parseInt(this.payload.group_id) !== 0) {
        axios.get(this.$store.state.path_to_server + 'group_name/?id=' + this.payload.group_id, { headers })
          .then(response => {
            if (response.data.name !== '----- BRAK RANGI NA TS3---- ') {
              this.checked_name_rank = true
              this.payload.group_name = response.data.name
            }
          })
      }
    }
  },
  computed: {
    buttonName () {
      if (this.checked_name_rank === false) return 'Sprawdź id rangi'
      else return 'Sprawdź id rangi <i class="far fa-check-circle"></i>'
    }
  }
}
</script>

<style lang="scss" scoped>
#main_content {
  display: flex;
  justify-content: center;
}
.modal-content {
  background-color: #42b983 !important;
}
.main {
  width: min-content;
  padding: 20px 50px;
}
.main .header {
  font-family: 'Itim', cursive;
  font-size: 1.8vw;
  text-align: center;
  align-items: center;
  color: #ffc107;
}
.box {
  display: block;
}
.element {
  display: flex;
  align-items: center;
  justify-content: center;
}
.element .label {
  width: 400px;
  margin: 5px 10px;
  font-family: 'Itim', cursive;
  color: white;
  font-size: 1.2vw;
}
.button {
  float: right;
  background-color: #242424;
}
.button:hover {
  background-color: rgba(36, 36, 36, 0.27);
}
input {
  width: 250px;
}
.element p {
  width: 200px;
  font-family: 'Itim', cursive;
  margin: 0;
  padding: 10px;
}
select {
  width: 250px;
}
.check_button {
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.check_button .button {
  width: 100%;
}
.parameter {
  z-index: 0;
}
</style>
