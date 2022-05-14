<template>
  <div>
    <b-modal id="staff-card-info"
             centered
             title="Zarządzaj grupą"
             v-model="state"
             size="l"
             hide-footer
    >
      <b-form>
        <b-form-group id="input-group-1" label="Nazwa grupy:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.groupName"
            placeholder="Wprowadź nazwę grupy"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Sort id:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.sortId"
            placeholder="Wprowadź sort id"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <div id="footer">
        <div id="footer-left">
          <b-button variant="danger" v-if="!add_new" @click="delete_rank">Usuń grupę</b-button>
        </div>
        <div id="footer-right">
          <b-button variant="success" v-if="add_new" @click="put">Dodaj nową grupę</b-button>
          <b-button variant="success" v-if="!add_new" @click="put">Zapisz zmiany</b-button>
        </div>
      </div>
    </b-modal>
  </div>

</template>

<script>
export default {
  name: 'RankGroupCard',
  props: {
    data: null
  },
  data () {
    return {
      state: true,
      form: {
        sortId: null,
        groupName: null,
        id: null
      },
      add_new: false
    }
  },
  updated () {
    if (this.state === false) {
      this.$emit('status_back')
    }
  },
  mounted () {
    if (this.data == null) {
      this.form.sortId = null
      this.form.groupName = null
      this.form.id = 0
      this.add_new = true
    } else {
      this.add_new = false
      this.form.sortId = this.data.sortId
      this.form.groupName = this.data.groupName
      this.form.id = this.data.id
    }
  },
  methods: {
    put () {
      this.$store.dispatch('put_rank_group_games', this.form)
      this.$emit('status_back')
    },
    delete_rank () {
      this.$store.dispatch('delete_rank_group_games', this.form)
      this.$emit('status_back')
    }
  }

}
</script>

<style scoped>
#footer {
  display: inline;
}
#footer-left {
  float: left;
}
#footer-right {
  float: right;
}
</style>
