<template>
  <div class="main">
    <b-modal id="add-type-ban"
             v-model="show_form"
             size="xl"
             centered no-close-on-backdrop
             title="Edydtuj listę uprawnień"
             header-bg-variant="dark"
             header-text-variant="light"
             body-bg-variant="dark"
             body-text-variant="light"
             footer-bg-variant="dark"
             footer-text-variant="light"
    >
      <b-overlay :show="!api_loaded_permissions" rounded="sm" variant="dark" class="overlay">
        <div class="table">
          <b-table :fields="fields_table_permissions"
                   class='text-center'
                   :items="table_permission_data"
                   table-variant="dark"
                   id="my-table"
          >
            <template #cell(Nazwa)="data">
              <div class="name_cell">
                [{{data.item.grant_rank.rank_name}}]
                <br>
                {{data.item.ActionBanType.name}}
              </div>
            </template>
            <template #cell(uprawnienia)="data">
              <div class="table_permissions">
                <div class="column_box">
                  <div class="content_box">
                    <div class="label_box">Możliwość nadania kary:</div>
                    <b-form-checkbox v-model="data.item.BanPermission.add" name="check-button" switch @change="updatePermissions(data.item)"/>
                  </div>
                  <div class="content_box"  v-if="data.item.BanPermission.add">
                    <div class="label_box">Weryfikacja 2 etapowa:</div>
                    <b-form-checkbox v-model="data.item.BanPermission.two_factor_auth" name="check-button" switch @change="updatePermissions(data.item)"/>
                  </div>
                  <div class="content_box"  v-if="data.item.BanPermission.add">
                    <div class="label_box">Możliwość wprowadzenia kary do zatwierdzenia po wyjściu po za zakres czasu:</div>
                    <b-form-checkbox v-model="data.item.BanPermission.overflow" name="check-button" switch @change="updatePermissions(data.item)"/>
                  </div>
                </div>
                <div class="column_box" v-if="data.item.BanPermission.add">
                  <div class="content_box">
                    <div class="label_box">Możliwość zatwierdzania kar po za zakresem czasu:</div>
                    <b-form-checkbox v-model="data.item.BanPermission.commit" name="check-button" switch @change="updatePermissions(data.item)"/>
                  </div>
                  <div class="content_box">
                    <div class="label_box">Możliwość zatwierdzania kar automatycznych:</div>
                    <b-form-checkbox v-model="data.item.BanPermission.commit_auto" name="check-button" switch @change="updatePermissions(data.item)"/>
                  </div>
                  <div class="content_box">
                    <div class="label_box">Możliwość kasowania kary:</div>
                    <b-form-checkbox v-model="data.item.BanPermission.delete" name="check-button" switch @change="updatePermissions(data.item)"/>
                  </div>
                </div>
                <div class="column_box"  v-if="data.item.BanPermission.add">
                  <div class="content_box">
                    <div class="label_box2">Maksymalny czas kary:</div>
                    <b-form-input type="number"  v-model="data.item.BanPermission.max_time_to_action" @change="updatePermissions(data.item)"></b-form-input>
                  </div>
                  <div class="content_box">
                    <div class="label_box2">Limit kar na 10m:</div>
                    <b-form-input type="number"  v-model="data.item.BanPermission.limit_per_10m" @change="updatePermissions(data.item)" ></b-form-input>
                  </div>
                  <div class="content_box">
                    <div class="label_box2">Limit kar na 1d:</div>
                    <b-form-input type="number"  v-model="data.item.BanPermission.limit_per_1d" @change="updatePermissions(data.item)" ></b-form-input>
                  </div>
                </div>
              </div>
            </template>
          </b-table>
        </div>
      </b-overlay>
    </b-modal>
    <div class="box">
      <div class="header">Uprawnienia systemu kar</div>
      <div class="label">kliknij na wiersz aby edytować uprawnienia dla grupy</div>
      <b-overlay :show="!api_loaded" rounded="sm" variant="dark" class="overlay">
        <div class="table">
          <b-table hover :fields="fields"
                   class='text-center'
                   :items="table_data"
                   table-variant="dark"
                   id="my-table"
                   @row-clicked="rowClick"
          >
          </b-table>
        </div>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Permissions.vue',
  data () {
    return {
      api_loaded: false,
      api_loaded_permissions: false,
      fields: [
        {
          key: 'rank_name',
          label: 'Nazwa rangi'
        }
      ],
      fields_table_permissions: [
        'Nazwa',
        'Uprawnienia'
      ],
      show_form: false,
      table_data: null,
      table_permission_data: null
    }
  },
  methods: {
    getTableData () {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.get(this.$store.state.path_to_server + 'staff/get-staff-rank-list', { headers })
        .then(response => {
          this.table_data = response.data
          this.api_loaded = true
        })
    },
    rowClick (item, index, event) {
      const headers = {
        'Content-Type': 'application/json'
      }
      this.api_loaded_permissions = false
      this.table_permission_data = null
      this.show_form = true
      axios.get(this.$store.state.path_to_server + 'bans/get_permissions/' + item.rank_id, { headers })
        .then(response => {
          this.table_permission_data = response.data
          this.api_loaded_permissions = true
        })
    },
    updatePermissions (item) {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.put(this.$store.state.path_to_server + 'bans/update_permissions/', item.BanPermission, { headers })
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>

<style scoped>
body {
  line-height: 0 !important;
}
.main {
  font-family: 'Itim', cursive;
  display: flex;
  justify-content: center;
}
.box {
  width: min-content;
  padding: 20px 25px;
}
.header {
  text-align: center;
  color: #ffc107;
  font-size: 2vw;
}
.label{
  text-align: center;
  font-size: 1vw;
  width: max-content;
  margin-bottom: 5px;
}
.table_permissions {
  font-family: 'Itim', cursive;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.column_box {
  display: block;
  background-color: #454d55;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
}
.content_box  {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content_box .label_box {
  width: 200px;
  text-align: left;
  padding-right: 10px;
  margin: 10px;
}
.content_box .label_box2 {
  width: 180px;
  text-align: left;
  padding-right: 10px;
  margin: 10px;
}
.content_box input {
  width: 95px;
  height: 35px;
}
.name_cell {
  font-family: 'Itim', cursive;
}
</style>
