<template>
    <div>
        <div id="main_content">
                <div id="province">
                    <b-jumbotron  lead="Lista administartorów" >
                            <b-table class="table"
                            :items="staff_list"
                            :fields="fields"
                            :hover="true"
                            :busy="busystate"
                            @row-clicked="rowclick_staf_list"
                            >
                            <template #table-busy>
                              <div class="text-center text my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                              </div>
                            </template>
                              <template #cell(id)="data">
                                {{ data.index + 1 }}
                              </template>
                              <template #cell(last_login)="data">
                                {{ data.item.last_login | date_format }}
                              </template>
                            </b-table>
                            <b-button class="button" variant="primary" v-b-modal.modal-center>Dodaj nowego</b-button>
                    </b-jumbotron>
                </div>
                <b-modal id="modal-center" centered title="Dodaj Użytkownika">
                                  <b-pagination
                                v-model="currentPage"
                                :total-rows="rows"
                                :per-page="perPage"
                                aria-controls="table-list"
                              ></b-pagination>
                              <b-form-input
                              id="filter-input"
                              v-model="filter"
                              type="search"
                              placeholder="Wprowadź login"
                              ></b-form-input>
                              <br>
                              <br>
                            <b-table id="table-list"
                            :items="user_list"
                            :filter="filter"
                            :fields="fields2"
                            :hover="true"
                            :busy="busystate2"
                            :per-page="perPage"
                            :current-page="currentPage"
                            @row-clicked="rowclick_alllist"
                            @filtered="onFiltered"
                            >
                            <template #table-busy>
                              <div class="text-center text my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                              </div>
                            </template>
                              <template #cell(id)="data">
                                {{ data.index + 1 }}
                              </template>
                              <template #cell(last_login)="data">
                                {{ data.item.last_login | date_format }}
                              </template>
                            </b-table>
                </b-modal>
                <StaffCard v-if="visible_admin_card" :data="data_to_card" :status="visible_admin_card" @status_back="back"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import StaffCard from '../components/StaffCardInfo'
export default {
  components: {
    StaffCard
  },
  data () {
    return {
      fields: [{ key: 'id', label: 'Lp ' }, { key: 'login', label: 'Login' }, { key: 'dbid', label: 'DBID' }, { key: 'last_login', label: 'Ostatnie logowanie' }, { key: 'privilages[0].rank_name', label: 'Ranga' }],
      fields2: [{ key: 'id', label: 'Lp ' }, { key: 'login', label: 'Login' }, { key: 'dbid', label: 'DBID' }, { key: 'last_login', label: 'Ostatnie logowanie' }],
      busy: true,
      filter: null,
      perPage: 3,
      currentPage: 1,
      visible_admin_card: false,
      data_to_card: null
    }
  },
  mounted () {
    this.$store.dispatch('get_staff_list')
    this.$store.dispatch('get_user_list')
  },
  computed: {
    ...mapState([
      'staff_list',
      'user_list',
      'admin_card'
    ]),
    busystate () {
      if (this.staff_list == null) {
        return true
      } else return false
    },
    busystate2 () {
      if (this.user_list == null) {
        return true
      } else return false
    },
    rows () {
      if (this.user_list == null) return
      return this.user_list.length
    }
  },
  filters: {
    date_format: function (value) {
      if (!value) return ''
      var date = new Date(value * 1000)
      return (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
    }
  },
  methods: {
    rowclick_alllist (item, index, event) {
      this.showConirmadd(item)
    },
    rowclick_staf_list (item, index, event) {
      this.visible_admin_card = true
      this.data_to_card = item
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      if (filteredItems != null) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    showConirmadd (item) {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm(item.login, {
        title: 'Potwierdź dodanie użytkownika do systemu:',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Tak',
        cancelTitle: 'Nie',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value === true) {
            this.$store.dispatch('change_role_user', item)
          }
        })
    },
    back () {
      this.visible_admin_card = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

#main_content {
    position: absolute;
    text-align: left;
    color: black;
    overflow: auto;
    display: flex;
    max-width: none;
    margin-top: 70px;
    left: 50%;
    transform: translate(-50%);
    display: block;
}
#gender {
    color: black;
    text-align: center;
    font-family: 'Noto Sans', sans-serif;
}
#province {
    color: black;
    text-align: center;
    font-family: 'Noto Sans', sans-serif;
}
.jumbotron {
    background-color: #ffc107;
}
.table{
    background-color:white;
}
.button {
    float: right;
}
</style>
