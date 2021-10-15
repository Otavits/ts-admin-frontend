<template>
  <div class="main">
    <b-modal id="add-type-ban"
             v-model="show_form"
             size="xl"
             centered no-close-on-backdrop
             title="Dodaj karę"
             header-bg-variant="dark"
             header-text-variant="light"
             body-bg-variant="dark"
             body-text-variant="light"
             footer-bg-variant="dark"
             footer-text-variant="light"
             @hidden="resetForm"
    >
      <b-alert v-model="alert.name" variant="dark" dismissible fade>
        Nie wprowadzono nazwy
      </b-alert>
      <b-alert v-model="alert.description" variant="dark" dismissible fade>
        Nie wprowadzono opisu
      </b-alert>
      <div class="add_ban_box">
        <b-overlay :show="!api_loaded_add_card" rounded="sm" variant="dark" class="overlay">
        <div class="add_ban_box_simple">
          <div class="label_input">
            <p>Wpisz nazwę:</p>
            <b-form-input type="text"
                          placeholder="Wprowadź nazwę ...."
                          v-model="payload.name"
                          >
            </b-form-input>
          </div>
          <div class="label_input">
            <p>Wpisz opis kary:</p>
            <b-form-textarea
              id="textarea"
              placeholder="Wprowadź treść ...."
              rows="3"
              max-rows="6"
              v-model="payload.description"
            ></b-form-textarea>
          </div>
          <div class="label_input">
            <p>Pominięcie uprawnień specjalnych</p>
            <b-form-checkbox name="check-button" switch v-model="payload.skip_grant"/>
          </div>
          <div class="label_input">
            <p>Czy aktywna</p>
            <b-form-checkbox name="check-button" switch v-model="payload.active"/>
          </div>
          <b-button v-if="payload.id==0" squared class="button" @click="putBanTable">Dodaj</b-button>
          <b-button v-if="payload.id!=0" squared class="button" @click="putBanTable">Zapisz</b-button>
        </div>
        </b-overlay>
        <div v-if="payload.id==0" class="title">Zapisz, aby móć wprowadzić krotności</div>
        <div v-if="payload.id!=0" class="title">Wprowadź krotności kar</div>
        <b-overlay v-if="payload.id!=0" :show="!api_loaded_table_times" rounded="sm" variant="dark" class="overlay">
          <div class="table">
            <b-table hover :fields="fields_table_times"
                     class='text-center'
                     :items="ban_times_table"
                     table-variant="dark"
                     id="my-table"
            >
              <template #cell(Lp)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(IlośćOd)="data">
                <div class="small_input">
                  <b-form-input  @change="putBanTableTimes(data.item)" type="number" v-model="data.item.times_from"/>
                </div>
              </template>
              <template #cell(IlośćDo)="data">
                <div class="small_input">
                  <b-form-input  @change="putBanTableTimes(data.item)" type="number" v-model="data.item.times_to"/>
                </div>
              </template>
              <template #cell(Punkty)="data">
                <div class="large_input">
                  <b-form-input  @change="putBanTableTimes(data.item)" type="number" v-model="data.item.points"/>
                </div>
              </template>
              <template #cell(CzasOd)="data">
                <div v-if="checkIsTimed(data.item.action_id)" class="large_input">
                  <b-form-input  @change="putBanTableTimes(data.item)" type="number" v-model.number="data.item.time_from"/>
                </div>
              </template>
              <template #cell(CzasDo)="data">
                <div v-if="checkIsTimed(data.item.action_id)" class="large_input">
                  <b-form-input  @change="putBanTableTimes(data.item)" type="number" v-model="data.item.time_to"/>
                </div>
              </template>
              <template #cell(Usuń)="data">
                <b-button size="sm" variant="danger" @click="deleteBanTableTimes(data.item)">USUŃ</b-button>
              </template>
              <template #cell(RodzajAkcji)="data">
                  <select class="list_type" v-model="data.item.action_id" @change="putBanTableTimes(data.item)">
                    <option v-for="(option, index) in ban_action" v-bind:value="option.id" :key="index">
                      {{ option.name }}
                    </option>
                  </select>
              </template>
            </b-table>
          </div>
        </b-overlay>
        <b-button v-if="payload.id!=0" squared class="button" @click="addBanTableTimes(payload.id)">Dodaj</b-button>
      </div>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">
          Anuluj
        </b-button>
      </template>
    </b-modal>
    <div class="box">
      <div class="search_element">
        <div :class="true ? 'search_box' : 'search_box_input'">
          <div class="icon">
            <i class="far fa-file"></i>
          </div>
          <div class="label_and_input">
            <div class="label">
              Nazwa kary
            </div>
            <input type="text" name="title" placeholder="Wprowadź nazwę" v-model="search.nick">
          </div>
        </div>
      </div>
      <div class="search_element">
        <div :class="true ? 'search_box' : 'search_box_input'">
          <div class="icon">
            <i class="fas fa-pencil-alt"></i>
          </div>
          <div class="label_and_input">
            <div class="label">
              Opis kary
            </div>
            <input type="text" name="title" placeholder="Wprowadź opis" v-model="search.description">
          </div>
        </div>
      </div>
    </div>
    <!-- Table with bans type -->
    <b-overlay :show="!api_loaded" rounded="sm" variant="dark" class="overlay">
      <div class="table">
        <b-table hover :fields="fields"
                 class='text-center'
                 :items="filteredTableData"
                 table-variant="dark"
                 id="my-table"
                 @row-clicked="rowClick"
        >
          <template #cell(Lp)="data">
            {{ data.index + 1}}
          </template>
        </b-table>
      </div>
    </b-overlay>
    <b-button squared class="button" @click="show_form = !show_form">Dodaj</b-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BanTable.vue',
  computed: {
    filteredTableData () {
      return this.table_data.filter(elelemt => elelemt.name.toLowerCase().includes(this.search.nick.toLowerCase())).filter(elelemt => elelemt.description.toLowerCase().includes(this.search.description.toLowerCase()))
    }
  },
  data () {
    return {
      alert: {
        name: false,
        description: false
      },
      api_loaded: false,
      api_loaded_add_card: false,
      api_loaded_table_times: false,
      ban_action: [],
      ban_times_table: [],
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
      fields_table_times: [
        'Lp',
        'IlośćOd',
        'IlośćDo',
        'RodzajAkcji',
        'Punkty',
        'CzasOd',
        'CzasDo',
        'Usuń'
      ],
      payload: {
        id: 0,
        name: '',
        description: '',
        skip_grant: false,
        active: true
      },
      search: {
        nick: '',
        description: ''
      },
      show_form: false,
      table_data: []
    }
  },
  methods: {
    test (value) {
      return value
    },
    addBanTableTimes (banId) {
      const headers = {
        'Content-Type': 'application/json'
      }
      const payload = {
        id: 0,
        action_id: 0,
        ban_id: banId,
        times_from: 0,
        times_to: 0,
        time_from: 0,
        time_to: 0,
        points: 0
      }
      axios.put(this.$store.state.path_to_server + 'bans/put_ban_times_by_ban_id/', payload, { headers })
      this.getBanTableTimes(this.payload.id)
    },
    checkIsTimed (id) {
      let tempData = this.ban_action
      tempData = tempData.filter(item => item.id === id)
      if (tempData.length === 0) return false
      if (tempData[0].time === true) return true
      else return false
    },
    deleteBanTableTimes (payload) {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.delete(this.$store.state.path_to_server + 'bans/delete_ban_times_by_ban_id', { data: payload }, { headers })
      this.getBanTableTimes(this.payload.id)
    },
    getBanAction () {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.api_loaded_add_card = false
      axios.get(this.$store.state.path_to_server + 'bans/get_ban_action_type/', { headers })
        .then(response => {
          this.ban_action = response.data
          this.api_loaded_add_card = true
        })
    },
    getBanTable () {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.api_loaded = false
      axios.get(this.$store.state.path_to_server + 'bans/get_ban_table', { headers })
        .then(response => {
          this.table_data = response.data
          this.api_loaded = true
        })
    },
    getBanTableTimes (banId) {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.api_loaded_table_times = false
      axios.get(this.$store.state.path_to_server + 'bans/get_ban_times_by_ban_id/' + banId, { headers })
        .then(response => {
          if (response.data.length > 0) this.ban_times_table = response.data
          this.api_loaded_table_times = true
        })
    },
    putBanTable () {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.alert = {
        name: false,
        description: false
      }
      let canSend = true
      if (this.payload.name === '') {
        this.alert.name = true
        canSend = false
      } else this.alert.name = false
      if (this.payload.description === '') {
        this.alert.description = true
        canSend = false
      } else this.name = false
      if (canSend) {
        axios.put(this.$store.state.path_to_server + 'bans/put_ban_table/', this.payload, { headers })
        this.resetForm()
        this.getBanTable()
        this.show_form = false
      }
    },
    putBanTableTimes (payload) {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.put(this.$store.state.path_to_server + 'bans/put_ban_times_by_ban_id/', payload, { headers })
    },
    resetForm () {
      this.payload = {
        id: 0,
        name: '',
        description: '',
        skip_grant: false,
        active: true
      }
      this.alert = {
        name: false,
        description: false
      }
      this.ban_times_table = []
    },
    rowClick (item, index, event) {
      this.getBanTableTimes(item.id)
      this.payload = item
      this.show_form = true
    }
  },
  mounted () {
    this.getBanAction()
    this.getBanTable()
  }
}
</script>

<style scoped>
.main {
  font-family: 'Itim', cursive;
}
.box {
  display: flex;
  justify-content: space-around;
}
.search_element {
  background-color: #2c3e50;
  border-radius: 8px;
  margin-bottom: 10px;
}
.search_box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  text-align: center;
  transition: background .2s ease-in;
}
.search_box_input {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  text-align: center;
  transition: background .2s ease-in;
  background-color: #ffc107;
  border-radius: 8px;
}
.label {
  font-size: 1.5vw;
}
.icon {
  font-size: 2vw;
}
input {
  width: 100%;
}
.label_and_input {
  width: 80%;
}
.dbid input {
  width: 100px;
}
.button {
  float: right;
  background-color: #2c3e50;
}
.button:hover {
  background-color: rgba(36, 36, 36, 0.27);
}
.add_ban_box {
  font-family: 'Itim', cursive;
}
.add_ban_box_simple {
  display: flex;
  flex-direction: column;
}
.add_ban_box_simple .label_input{
  display: flex;
  align-items: center;
  padding: 8px;
}
.add_ban_box_simple p {
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  width: 200px;
  margin-right: 5px;
}
.form-control {
  width: 400px !important;
}
.title {
  text-align: center;
  padding: 10px;
  font-size: 1.8vw;
}
.small_input input{
  width: 60px !important;
  display: unset !important;
}
.large_input input{
  width: 80px !important;
  display: unset !important;
}
.button_delete {
  float: right;
  background-color: #d92f2f;
}
.button_delete:hover {
  background-color: rgba(36, 36, 36, 0.27);
}
</style>
