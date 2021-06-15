<template>
    <div>
            <b-modal id="staff-card-info"
            centered
            title="Zarządzaj administratorem"
            v-model="state"
            size="xl"
            hide-footer
            >
        <b-skeleton-wrapper :loading="loading">
            <template #loading>
                <b-card>
                <b-skeleton width="85%"></b-skeleton>
                <b-skeleton width="55%"></b-skeleton>
                <b-skeleton width="70%"></b-skeleton>
                </b-card>
            </template>
        <b-card>
                <b-tabs content-class="mt-3">
                    <b-tab title="Ogólne" active>
                    <p><b>Login: {{ data.login }}</b></p>
                    <p><b>Dbid: {{ data.dbid }}</b></p>
                    <p><b>Ostatnie logowanie do systemu: {{ data.last_login | date_format}}</b></p>
                    </b-tab>
                    <b-tab title="Informacje" disabled>
                        <h6>Dane administratora:</h6>
                        <b-container fluid>
                            <b-row class="my-1" align-v="center">
                            <b-col sm="3" align-self="center">
                                <label>Imię :</label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-input></b-form-input>
                            </b-col>
                            </b-row>
                        </b-container>
                    </b-tab>
                    <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
                    <b-tab title="Aktywność" disabled><p>I'm a disabled tab!</p></b-tab>
                    <b-tab title="Uprawnienia">
                        <h6>Ranga uprawnień w systemie:</h6>
                        <b-form-select
                        v-model="rank_selected"
                        :options="staff_rank"
                        class="mb-3"
                        value-field="rank_id"
                        text-field="rank_name"
                        >
                        <template #first>
                        <b-form-select-option value=null disabled>-- Aktualnie brak ustawionej rangi --</b-form-select-option>
                        </template>
                        </b-form-select>
                        <div id="button-box">
                        <b-button variant="primary" @click="onSubmit">Zapisz</b-button> <b-button variant="danger" @click="showConirmadd">Usuń uprawnienia</b-button>
                        </div>
                        <b-button variant="danger" >Usuń administratora z systemu</b-button>
                    </b-tab>

                </b-tabs>
        </b-card>
        </b-skeleton-wrapper>
        </b-modal>
        <b-modal id="modal-confirm" hide-footer centered>
            <template #modal-title>
            Zmiany zapisano
            </template>
            <b-button class="mt-3" block @click="goBack">Ok</b-button>
        </b-modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    data: null
  },
  data () {
    return {
      state: true,
      loading: false,
      rank_selected: null,
      payload: {
        dbid: null,
        rank_id: null
      }
    }
  },
  computed: {
    ...mapState([
      'admin_card',
      'staff_rank'
    ])
  },
  mounted () {
    this.$store.dispatch('get_staff_rank')
    if (this.data.privilages.length !== 0) {
      this.rank_selected = this.data.privilages[0].rank_id
    }
  },
  updated () {
    if (this.state === false) {
      this.$emit('status_back')
    }
  },
  methods: {
    test () {
      this.$emit('status_back')
    },
    onSubmit () {
      this.payload.dbid = this.data.dbid
      this.payload.rank_id = this.rank_selected
      this.$store.dispatch('set_privilage_to_staf', this.payload)
      this.$bvModal.show('modal-confirm')
    },
    goBack () {
      this.$store.dispatch('get_staff_list')
      this.$bvModal.hide('modal-confirm')
    },
    showConirmadd () {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm(this.data.login, {
        title: 'Czy napewno chcesz usunąc uprawnienia użytkownikowi:',
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
            this.payload.dbid = this.data.dbid
            this.payload.rank_id = this.rank_selected
            this.$store.dispatch('delete_privilage_to_staf', this.payload)
            this.$bvModal.show('modal-confirm')
          }
        })
    }
  },
  filters: {
    date_format: function (value) {
      if (!value) return ''
      var date = new Date(value * 1000)
      return (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
    }
  }
}
</script>

<style lang="scss" scoped>
#button-box {
    float: right;
}
</style>
