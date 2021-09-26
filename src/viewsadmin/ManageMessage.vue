<template>
  <div id="main_content">
    <div id="container">
      <b-alert v-model="alert.date_auto_pub" dismissible variant="dark"><B>Wprowadzona data auto-publikacji nieprawidłowa!</B></b-alert>
      <b-alert v-model="alert.date_auto_arch" dismissible variant="dark"><B>Wprowadzona data auto-kasowania nieprawidłowa!</B></b-alert>
      <b-alert v-model="alert.message" dismissible variant="dark"><B>Wprowadź tekst!</B></b-alert>
      <b-alert v-model="alert.type" dismissible variant="dark"><B>Wybierz rodzaj wiadomości!</B></b-alert>
      <b-alert v-model="alert.user" dismissible variant="dark"><B>Wybierz użytkownika!</B></b-alert>
      <b-alert v-model="alert.group" dismissible variant="dark"><B>Zaznacz conajmniej jedną grupę!</B></b-alert>
      <b-alert v-model="alert.title" dismissible variant="dark"><B>Wprowadź tytuł!</B></b-alert>
      <b-jumbotron>
        <div class="mytabs">
          <input type="radio" id="tab_message" name="mytabs" checked="checked" v-if="$route.params.id == 0 ">
          <label  v-if="$route.params.id == 0 " for="tab_message">Aktywne wiadomości  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            <b-overlay :show="!apiLoaded" rounded="sm" variant="dark">
              <div v-for="(component, index) in active_message_id" :key="index">
                <ActiveMessage
                  :message_id="component"
                  @go_to_modify="go_to_modify"
                />
              </div>
            </b-overlay>
          </div>
          <input  v-if="$route.params.id != 0 " type="radio" id="tab_add" name="mytabs" checked="checked">
          <label   v-if="$route.params.id != 0 " for="tab_add">Edytuj wiadomość  <i class="fas fa-comment-medical"></i></label>
          <input  v-if="$route.params.id == 0 " type="radio" id="tab_add" name="mytabs">
          <label   v-if="$route.params.id == 0 " for="tab_add">Dodaj wiadomość  <i class="fas fa-comment-medical"></i></label>
          <div class="tab">
            <div class="add_message">
              <b-overlay :show="!apiLoadedModifyMessage" rounded="sm" variant="dark">
                <h2 v-if="$route.params.id == 0">Tworzenie nowej wiadomości</h2>
                <h2 v-if="$route.params.id != 0">Edydtowanie wiadomości</h2>
                <hr>
                <div class="date-box">
                  <div class="arch">
                    <h3>Tytuł:</h3>
                    <input type="text" name="title" placeholder="Wprowadź tytuł" v-model="payload.title">
                    <span class="tooltiptext">Wprowadź tytuł</span>
                  </div>
                </div>
                <h3>Treść wiadomości:</h3>
                <b-form-textarea
                    id="textarea"
                    v-model="payload.message"
                    placeholder="Wprowadź treść ...."
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
                <br>
                <div class="date-box">
                  <div class="arch">
                    <h3>Data auto-archiwizacji:</h3>
                    <input type="date" name="bday" placeholder="Wprowadź datę" v-model="payload.date_auto_arch">
                    <span class="tooltiptext">Wprowadź datę</span>
                  </div>
                  <div class="arch">
                    <h3>Data auto-publikacji:</h3>
                    <input type="date" name="bday" placeholder="Wprowadź datę, pozostaw dla publikacji natchmiastowej"
                           v-model="payload.date_auto_pub">
                    <span class="tooltiptext">Wprowadź datę, pozostaw dla publikacji natchmiastowej</span>
                  </div>
                  <div class="arch">
                    <h3>Piorytet:</h3>
                    <input type="number" name="bday" placeholder="Wprowadź piorytet" v-model="payload.priority">
                  </div>
                  <div class="arch">
                    <h3>Kasowanie:</h3>
                    <select class="list_type" v-model="payload.readable">
                      <option v-for="(option, index) in type_options_toreadable" v-bind:value="option.value" :key="index">
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                  <div class="arch">
                    <h3>Typ wiadomości:</h3>
                    <select class="list_type" v-model="payload.selected_type">
                      <option v-for="(option, index) in type_options" v-bind:value="option.value" :key="index">
                        {{ option.text }}
                      </option>
                    </select>
                  </div>
                  <div class="arch">
                    <div class="archtitle" v-if="payload.selected_type === 'single'">Nick użytkownika:</div>
                      <SearchUser :selected="payload.searchUser" v-if="payload.selected_type === 'single'" class="SearchUser" @on-item-selected="payload.searchUser = $event" @on-item-reset="payload.searchUser = {}"/>
                  </div>
                </div>
                <h4 v-if="payload.selected_type === 'group'">Odbiorcy:</h4>
                <div class="recipment" v-if="payload.selected_type === 'group'">
                  <div class="box">
                    <h3 >Grupy użytkowników:</h3>
                    <div class="list" v-for="(user_rank, index) in user_rank" :key="index">
                      <b-form-checkbox
                          :id=user_rank.rank_name
                          v-model="payload.selected_user"
                          :name=user_rank.rank_name
                          :value=user_rank.rank_id
                          :unchecked-value=null
                      >
                        {{user_rank.rank_name}}
                      </b-form-checkbox>
                    </div>
                  </div>
                  <div class="box">
                    <h3> Grupy Administarcyjne: </h3>
                    <div class="list" v-for="(staff_rank, index) in staff_rank" :key="index">
                      <b-form-checkbox
                          :id=staff_rank.rank_name
                          v-model="payload.selected_staff"
                          :name=staff_rank.rank_name
                          :value=staff_rank.group_id
                          :unchecked-value=null
                      >
                        {{staff_rank.rank_name}}
                      </b-form-checkbox>
                    </div>
                  </div>
                </div>
                <b-button v-if="$route.params.id == 0" squared class="button" @click="send">Dodaj</b-button>
                <b-button v-if="$route.params.id != 0" squared class="button" @click="send">Zapisz</b-button>
                <b-button v-if="$route.params.id != 0" squared class="button" @click="back">Powrót</b-button>
              </b-overlay>
            </div>
          </div>
          <input  v-if="$route.params.id == 0 " type="radio" id="tab_arch" name="mytabs">
          <label  v-if="$route.params.id == 0 " for="tab_arch">Archiwum wiadomości  <i class="fas fa-comment-slash"></i></label>
          <div class="tab">
            asdasdasdasdasdasd
          </div>
          <input type="radio" id="tab_settings" name="mytabs"  v-if="$route.params.id == 0 ">
          <label for="tab_settings"  v-if="$route.params.id == 0 ">Ustawienia  <i class="fas fa-sliders-h"></i></label>
          <div class="tab">
            sadasasdda
          </div>
        </div>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import ActiveMessage from '../components/ActiveMessage'
import { mapState } from 'vuex'
import SearchUser from '../components/SearchUser'
import axios from 'axios'
export default {
  name: 'ManageMessage',
  components: {
    ActiveMessage,
    SearchUser
  },
  data () {
    return {
      active_message_id: null,
      alert: {
        date_auto_pub: false,
        date_auto_arch: false,
        message: false,
        type: false,
        user: false,
        group: false,
        title: false
      },
      payload: {
        title: '',
        date_auto_arch: '',
        date_auto_pub: '',
        selected_staff: [],
        selected_user: [],
        selected_type: null,
        searchUser: {},
        message: '',
        priority: 0,
        readable: false,
        id: 0
      },
      type_options: [
        { value: null, text: 'Wybierz rodzaj wiadomości' },
        { value: 'all', text: 'Wiadomość dla wszsytkich użytkowników' },
        { value: 'group', text: 'Wiadomość dla grup użytkowników' },
        { value: 'single', text: 'Wiadomość dla jednego użytkownika' }
      ],
      type_options_toreadable: [
        { value: false, text: 'Nie' },
        { value: true, text: 'Tak' }
      ],
      apiLoaded: false,
      apiLoadedModifyMessage: false
    }
  },
  mounted () {
    if (this.user_list_to_search === null) {
      this.$store.dispatch('get_user_search_list')
    }
    this.$store.dispatch('get_staff_rank')
    this.$store.dispatch('get_user_rank')
    const headers = {
      'Content-Type': 'application/json'
    }
    // TODO list_user_serach_toVUEX!!!
    axios
      .get(this.$store.state.path_to_server + 'staff/get_ids_message_non_arch/', { headers })
      .then(response => {
        this.active_message_id = response.data
      })
    if (this.$route.params.id !== '0') {
      const payload = { message_id: this.$route.params.id }
      axios
        .post(this.$store.state.path_to_server + 'login/get_message_by_id/', payload, { headers })
        .then(response => {
          this.payload.title = response.data.title
          this.payload.message = response.data.message
          this.payload.message = 'TO DO PIORYTY READABLE ITP ITD & RELOAD WAIT OR CHECK '
          this.payload.id = response.data.id
          this.payload.priority = response.data.priority
          this.payload.readable = response.data.readable
          let dateTemp = new Date(response.data.date_auto_arch * 1000)
          let dayTemp = 0
          if (dateTemp.getDate() <= 9) {
            dayTemp = '0' + dateTemp.getDate()
          } else {
            dayTemp = dateTemp.getDate()
          }
          if (dateTemp.getMonth() <= 9) {
            this.payload.date_auto_arch = dateTemp.getFullYear() + '-0' + dateTemp.getMonth() + '-' + dayTemp
          } else {
            this.payload.date_auto_arch = dateTemp.getFullYear() + '-' + dateTemp.getMonth() + '-' + dayTemp
          }
          dateTemp = new Date(response.data.date_auto_pub * 1000)
          if (dateTemp.getDate() <= 9) {
            dayTemp = '0' + dateTemp.getDate()
          } else {
            dayTemp = dateTemp.getDate()
          }
          if (dateTemp.getMonth() <= 9) {
            this.payload.date_auto_pub = dateTemp.getFullYear() + '-0' + dateTemp.getMonth() + '-' + dayTemp
          } else {
            this.payload.date_auto_pub = dateTemp.getFullYear() + '-' + dateTemp.getMonth() + '-' + dayTemp
          }
          if (response.data.to_all === true) {
            this.payload.selected_type = 'all'
          }
          if (response.data.to_id !== null) {
            this.payload.selected_type = 'single'
            if (this.user_list_to_search === null) {
              this.$store.dispatch('get_user_search_list').then(
                this.payload.searchUser = this.user_list_to_search.users.find(element => element.DBID === parseInt(response.data.to_id))
              )
            } else {
              this.payload.searchUser = this.user_list_to_search.users.find(element => element.DBID === parseInt(response.data.to_id))
            }
          }
          this.apiLoadedModifyMessage = true
        })
    } else {
      this.apiLoadedModifyMessage = true
    }
    this.apiLoaded = true
  },
  methods: {
    go_to_modify () {
      this.apiLoadedModifyMessage = false
    },
    back () {
      this.apiLoaded = false
      this.$router.push({ name: 'managemessage', params: { id: '0' } })
      window.location.reload()
    },
    send () {
      const nowDate = new Date()
      if (this.payload.title === '') {
        this.alert.title = true
      } else {
        this.alert.title = false
      }
      if (this.payload.message === '') {
        this.alert.message = true
      } else {
        this.alert.message = false
      }
      if (this.payload.selected_type === null) {
        this.alert.type = true
      } else {
        this.alert.type = false
      }
      if (this.payload.selected_type === 'single' && Object.keys(this.payload.searchUser).length === 0) {
        this.alert.user = true
      } else {
        this.alert.user = false
      }
      if (this.payload.selected_type === 'group' && (Object.keys(this.payload.selected_staff).length === 0 && Object.keys(this.payload.selected_user).length === 0)) {
        this.alert.group = true
      } else {
        this.alert.group = false
      }
      if (this.payload.date_auto_pub !== '' && Date.parse(this.payload.date_auto_pub) < nowDate) {
        this.alert.date_auto_pub = true
      } else {
        this.alert.date_auto_pub = false
      }
      if (Date.parse(this.payload.date_auto_pub) > Date.parse(this.payload.date_auto_arch) || Date.parse(this.payload.date_auto_arch) < nowDate) {
        this.alert.date_auto_arch = true
      } else {
        this.alert.date_auto_arch = false
      }
      const headers = {
        'Content-Type': 'application/json'
      }
      if (this.alert.message === false && this.alert.type === false && this.alert.user === false &&
          this.alert.group === false && this.alert.date_auto_pub === false && this.alert.date_auto_arch === false) {
        return axios.put(this.$store.state.path_to_server + 'staff/message/', this.payload, { headers }).catch(error => {
          console.log(error.response.data.message || error.message)
          console.log(error.response.data.detail || error.message)
        }
        )
      }
    }
  },
  computed: {
    ...mapState([
      'staff_rank',
      'user_rank',
      'user_list_to_search'
    ])
  }
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
// Import custom SASS variable overrides, or alternatively
// define your variable overrides here instead

// Import Bootstrap and BootstrapVue source SCSS files
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

// General style overrides and custom classes

#main_content {
  text-align: left;
  padding-right: 10px;
  float: left;
  color: black;
  margin-top: 10px;
  width:100%;
  overflow: auto;

}
#container {
  margin-top: 80px;
  margin-left: 10px;
  margin-right: 10px;
}
.jumbotron {
  background-color: #2e3944 !important;
  padding-bottom: 40px;
  padding-top: 40px;
}
.mytabs {
  display: flex;
  flex-wrap: wrap;
}
.mytabs input[type="radio"] {
  display: none;
}
.mytabs label {
  font-family: 'Itim', cursive;
  background: #3b4650;
  padding: 25px;
  font-weight: bold;
  margin-bottom: 0px;
  color: #fff;
}
.mytabs .tab {
  background: #242424;
  width: 100%;
  padding: 20px;
  order: 1;
  display: none;
  color: #fff;
}
.mytabs input[type="radio"]:checked + label + .tab {
  display: block;
}
.mytabs input[type="radio"]:checked + label {
  background: #242424;
}
.mytabs input[type="radio"]:not(:checked):hover + label {
  background: #ffc107;
}
.mytabs label i {
  font-size: 20px;
}
.add_message {
  background: #3b4650;
  border-radius: 8px;
  padding: 20px;
  height: 100%;
}
.add_message h2 {
  color: #ffc107;
  font-size: 25px;
  margin-bottom: 10px;
}
.add_message h3 {
  font-size: 18px;
  margin-bottom: 10px;
  display: inline-block;
}
.add_message h4 {
  text-align: center;
  margin-top: 8px;
}
.add_message hr {
  height:2px;
  border-width: 0px;
  border-radius: 1px;
  color: #E87538;
  background-color: #E87538;
}
textarea.form-control {
  background-color: #242424;
  color: white;
  border-color: #242424;
  overflow: auto !important;
}
textarea.form-control:focus {
  background-color: #242424;
  color: white;
  border-color: #E87538;
  box-shadow: 0 0 0 0.2rem rgb(232 117 56 / 25%);
}
textarea.form-control::selection {
  background-color: #E87538;
  color: white;
}
::-webkit-scrollbar{
  background: #242424;
  width: 14px;
}
::-webkit-scrollbar-track{
  box-shadow: inset 0 0 10px #00000070;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb{
  background: linear-gradient(125deg,#E87538,#ffc107);
  border-radius: 10px;
}
.add_message input {
  background-color: #242424;
  border-radius: 8px;
  color: #fff;
  border: none;
  padding: 5px;
  margin-left: 3px;
}
.add_message input[type="date"]::selection {
  background-color: #E87538 !important;
  color: white;
}
::-webkit-calendar-picker-indicator {
  background-color: #242424 !important;
}
.arch {
  vertical-align: middle;
  margin: 10px;
  margin-left: 0px;
  display: flex;
  align-items: center;
  width: min-content;
}
.arch .tooltiptext {
  visibility: hidden;
  opacity: 0;
  background-color: rgba(36,36,36,0.5);
  color: #fff;
  width: 280px;
  text-align: center;
  border-radius: 6px;
  padding: 5px 5px;
  transition: opacity .15s;
  /* Position the tooltip */
  z-index: 1;
  display: inline-block;
  position: absolute;
  transform: translate(150%, 0%);
}
.arch:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
.date-box {
  display: block;
  left: 0;
}
.arch input {
  margin-top: 5px;
  display: inline-block;
  right: 0;
  align-items: center;
  width: 200px;
}
.arch h3 {
  margin-top: 5px;
  display: inline-block;
  right: 0;
  width: 210px;
  align-items: center;
}
.archtitle {
  margin-top: 5px;
  right: 0;
  width: 210px;
  font-size: 18px;
  align-self: flex-start;
}
.recipment {
  display: flex;
  justify-content: space-around;
}
.box {
  background-color: #242424;
  padding: 5px;
  border-radius: 8px;
}
.list {
  display: flex;
}
.list_type {
  background-color: #242424;
  color: #fff;
  border-color: #242424;
  padding: 5px;
  margin-left: 3px;
  border-radius: 8px;
  width: 350px;
}
.list_type:focus {
  border-color: #E87538;
  box-shadow: 0 0 0 0.2rem rgb(232 117 56 / 25%);
}
.list_type::selection {
  background-color: #E87538 !important;
}
.list_type option:hover {
  background-color: white !important;
}
option:hover {
  background-color: yellow;
}
.SearchUser {
  margin: 1px;
  padding-bottom: 1px;
  width: 350px;
}
.search-box {
  margin-top: 1px;
}
.search-box h3 {
  align-items: center;
  margin-top: 30px;
}
.button {
  right: 0;
  float: right;
  margin-top: 10px;
  background-color: #242424;
  margin-left: 10px;
  margin-bottom: 10px;
}
.button:hover {
  background-color: rgba(36, 36, 36, 0.27);
}
.alert-dark {
  background-color: #E87538 !important;
  border-color: #E87538 !important;
  box-shadow: 0 0 0 0.2rem rgb(232 117 56 / 25%);
}
</style>
