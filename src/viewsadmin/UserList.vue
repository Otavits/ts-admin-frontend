<template>
  <div id="main_content">
    <div id="container">
      <b-jumbotron>
        <h2>Lista Użytkowników Ts3 Otavi.pl</h2>
        <div class="grid_container">
          <div class="nick">
            <div :class="settings_to_user_list.nick==='' ? 'search_box' : 'search_box_input'">
              <div class="icon">
                <i class="far fa-user"></i>
              </div>
              <div class="label_and_input">
                <div class="label">
                  Nick
                </div>
                <input type="text" name="title" placeholder="Wprowadź nick" v-model="settings_to_user_list.nick">
              </div>
            </div>
          </div>
          <div class="uid">
            <div :class="settings_to_user_list.uid==='' ? 'search_box' : 'search_box_input'">
              <div class="icon">
                <i class="far fa-user"></i>
              </div>
              <div class="label_and_input">
                <div class="label">
                  Uid
                </div>
                <input type="text" name="title" placeholder="Wprowadź uid" v-model="settings_to_user_list.uid">
              </div>
            </div>
          </div>
          <div class="ip">
            <div :class="settings_to_user_list.ip==='' ? 'search_box' : 'search_box_input'">
              <div class="icon">
                <i class="far fa-user"></i>
              </div>
              <div class="label_and_input">
                <div class="label">
                  Ip
                </div>
                <input type="text" name="ip" placeholder="Wprowadź ip" v-model="settings_to_user_list.ip">
              </div>
            </div>
          </div>
          <div class="dbid">
            <div :class="settings_to_user_list.dbid==='' ? 'search_box' : 'search_box_input'">
              <div class="icon">
                <i class="far fa-user"></i>
              </div>
              <div class="label_and_input">
                <div class="label">
                  DBID
                </div>
                <input type="number" name="dbid" placeholder="DBID" v-model="settings_to_user_list.dbid">
              </div>
            </div>
          </div>
          <div class="show_online" @click=change_state_selected_online>
            <SearchButton
            :checked="settings_to_user_list.selected_online"
            label="Pokaż on-line"
            icon="fas fa-user-alt"
            />
          </div>
          <div class="show_help">
            <SearchButton
            label="Pokaż na kanale pomocy"
            icon="fas fa-info-circle"
            />
          </div>
          <div class="show_waiting">
            <SearchButton
            label="Pokaż na poczekalni"
            icon="fas fa-home"
            />
          </div>
          <div class="refresh" @click="refresh">
            <RefreshButton
            :checked="refresh_queued"
            label="Odśwież"
            icon="fas fa-sync"
            />
          </div>
          <div class="clear"
          @click="erase"
          >
            <SearchButton
            label="Wyczyść filtry"
            icon="fas fa-eraser"
            />
          </div>
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="fill"
          limit="11"
          aria-controls="my-table"
        ></b-pagination>
        <b-overlay :show="list_all_user_in_db.length===0" rounded="sm">
          <b-table footClone hover :fields="fields"
                   :sort-by.sync="settings_to_user_list.sortBy"
                   :sort-desc.sync="settings_to_user_list.sortDesc"
                   :items="filtered_data_by_active"
                   :per-page="perPage"
                   :current-page="currentPage"
                   table-variant="dark"
                   id="my-table"
                   @row-clicked="row_click"
          >
            <template #cell(Last_login)="data">
              {{ data.item.last_login | date_format}}
            </template>
            <template #cell(IsOnline)="data">
              <i v-if="!data.item.isOnline" class="fas fa-user-alt-slash" v-bind:style="{ color: 'red'}"></i>
              <i v-if="data.item.isOnline" class="fas fa-user-alt" v-bind:style="{ color: 'green'}"></i>
            </template>
          </b-table>
        </b-overlay>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchButton from '../components/UserCard/SearchButton'
import RefreshButton from '../components/UserCard/RefreshButton'
import axios from 'axios'
export default {
  name: 'UserList.vue',
  components: {
    SearchButton,
    RefreshButton
  },
  data () {
    return {
      refresh_queued: false,
      perPage: 50,
      currentPage: 1,
      loadAPI: false,
      fields: [
        {
          key: 'nick',
          label: 'Nick',
          sortable: true
        },
        {
          key: 'uid',
          label: 'UID',
          sortable: true
        },
        {
          key: 'dbid',
          label: 'DBID',
          sortable: true
        },
        {
          key: 'last_ip',
          label: 'Ostatni adres IP',
          sortable: true
        },
        {
          key: 'Last_login',
          label: 'Data ostatniego zalogowania',
          sortable: true
        },
        {
          key: 'IsOnline',
          label: 'Status',
          sortable: true
        },
        {
          key: 'Status',
          label: 'Uwagi',
          sortable: true
        }
      ]
    }
  },
  mounted () {
    if (this.list_all_user_in_db.length === 0) {
      this.$store.dispatch('get_list_all_user_in_db')
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
  computed: {
    ...mapState([
      'list_all_user_in_db',
      'settings_to_user_list'
    ]),
    rows () {
      if (this.list_all_user_in_db.length === 0) {
        return 0
      } else {
        const array = this.filtered_data_by_active
        return array.length
      }
    },
    filtered_data_by_active () {
      if (this.list_all_user_in_db.length === 0) {
        return []
      } else {
        let tempData = this.list_all_user_in_db
        tempData = tempData.filter(name => name.nick.toLowerCase().includes(this.settings_to_user_list.nick.toLowerCase()))
        tempData = tempData.filter(name => name.uid.toLowerCase().includes(this.settings_to_user_list.uid.toLowerCase()))
        tempData = tempData.filter(name => name.last_ip.toLowerCase().includes(this.settings_to_user_list.ip.toLowerCase()))
        if (this.settings_to_user_list.dbid !== '') {
          tempData = tempData.filter(name => name.dbid === parseInt(this.settings_to_user_list.dbid))
        }
        if (this.settings_to_user_list.selected_online === true) {
          tempData = tempData.filter((item) => {
            return (item.isOnline === true)
          })
          return tempData
        } else {
          return tempData
        }
      }
    }
  },
  methods: {
    erase () {
      this.settings_to_user_list.selected_online = false
      this.settings_to_user_list.selected_help = false
      this.settings_to_user_list.selected_home = false
      this.settings_to_user_list.sortBy = 'DBID'
      this.settings_to_user_list.sortDesc = false
      this.settings_to_user_list.nick = ''
      this.settings_to_user_list.uid = ''
      this.settings_to_user_list.ip = ''
      this.settings_to_user_list.dbid = ''
    },
    row_click (item, index, event) {
      this.$router.push({ name: 'UserCard', params: { dbid: item.dbid } })
    },
    change_state_selected_online () {
      console.log('nulfl')
      if (this.settings_to_user_list.selected_online === true) {
        this.settings_to_user_list.selected_online = false
      } else {
        this.settings_to_user_list.selected_online = true
        this.settings_to_user_list.selected_help = false
        this.settings_to_user_list.selected_home = false
      }
    },
    refresh () {
      this.refresh_queued = true
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.get(this.$store.state.path_to_server + 'user/all-user-list/', { headers }).then(
        ({ data }) => {
          this.$store.commit('SET_LIST_ALL_USER_IN_DB', data)
          this.refresh_queued = false
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>

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

.jumbotron h2 {
  color: #ffc107;
  font-family: 'Itim', cursive;
  text-align: center;
}
.table {
  background-color: #242424 !important;
  color: white;
}
.b-pagination {
  margin-bottom: 0px !important;
  background-color: #242424 !important;
}
.box {
  background-color: #242424;
  border-radius: 8px;
  padding: 8px;
  color: white;
}
.box h3 {
  font-size: 28px;
}
.contents {
  display: flex;
}
.content_title {
  color: white;
  left: 0;
  width: 320px;
  padding-top: 10px;
}
.content_element {
  color: #2c3e50;
  padding-top: 10px;
}
.grid_container {
    font-family: 'Itim', cursive;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-template-rows: auto;
    grid-gap: 10px;
    padding: 10px;
    border-radius: 8px;
    color: white;
  }
.grid_container > div {
  background-color: #242424;
  border-radius: 8px;
  overflow: hidden;
}
.nick {
  grid-column-start: 1;
  grid-column-end: 3;
}
.uid {
  grid-column-start: 3;
  grid-column-end: 5;
}
.ip {
  grid-column-start: 5;
  grid-column-end: 7;
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
</style>
