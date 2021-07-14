<template>
    <div>
        <div id="main_content">
                <div id="form">
                    <b-jumbotron  lead="Jesteś w trybie edycji rangi:">

                        <div id="fields">
                                <b-form @submit="onSubmit">
                                    <b-form-group
                                        id="input-group-1"
                                        label="Nazwa Rangi"
                                        label-for="input-1"
                                        description="Nazwę możesz uzupełnić automatycznie po wpisaniu Id grupy na serwerze TS3"
                                    >
                                        <b-form-input
                                        id="input-1"
                                        v-model="form.rank_name"
                                        placeholder="Wprowadź nazwę rangi"
                                        required
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-2" label="Id grupy:" label-for="input-2">
                                        <b-form-input
                                        id="input-2"
                                        v-model="form.group_id"
                                        placeholder="Wprowadź Id grupy"
                                        type="number"
                                        required
                                        ></b-form-input>
                                    </b-form-group>

                                    <b-form-group id="input-group-3" label="Ścieżka do ikony:" label-for="input-3">
                                        <b-form-input
                                        id="input-3"
                                        v-model="form.path"
                                        placeholder="Wprowadź ścieżkę do ikony"
                                        required
                                        ></b-form-input>
                                    </b-form-group>
                                    <b-form-group v-if="$route.params.type==='rank_games'" id="input-group-4" label="Sort ID:" label-for="input-4">
                                      <b-form-input
                                        id="input-4"
                                        v-model="form.sort_id"
                                        placeholder="Wprowadź sort-id"
                                        required
                                      ></b-form-input>
                                    </b-form-group>
                                    <b-form-group v-if="$route.params.type==='rank_games'" id="input-group-5" label="Nazwa grupy:" label-for="input-5">
                                      <b-form-input
                                        id="input-4"
                                        v-model="form.group_name"
                                        placeholder="Wprowadź nazwę grupy"
                                        required
                                      ></b-form-input>
                                    </b-form-group>

                                    <b-button class="button" type="submit" variant="primary">Zapisz</b-button>
                                    <b-button v-if="$route.params.action==='modify'" class="button_get" @click="$bvModal.show('confirm-delete')" variant="danger">Usuń rangę</b-button>
                                    <b-button class="button_back" @click="goBack" variant="success">Powrót</b-button>
                                    <b-button v-if="$route.params.action==='add'" class="button_get" variant="info" @click="get_name_rank">Pobierz nazwę</b-button>
                                    </b-form>
                        </div>
                        <b-modal id="modal-add" hide-footer>
                            <template #modal-title>
                            Zmiany zapisano
                            </template>
                            <b-button class="mt-3" block @click="goBack">Powrót</b-button>
                        </b-modal>
                        <b-modal id="confirm-delete" hide-footer>
                            <template #modal-title>
                            Czy jesteś pewny, że chcesz usunąć rangę: {{ form.rank_name }}
                            </template>
                            <b-button variant="danger" block @click="remove">Potwierdź</b-button>
                        </b-modal>

                    </b-jumbotron>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  components: {
  },
  data () {
    return {
      form: {
        rank_name: '',
        group_id: 0,
        path: '',
        id: 0,
        type: '',
        sort_id: 0,
        group_name: ''
      }
    }
  },
  methods: {
    remove () {
      if (this.$route.params.type === 'rank_games') {
        this.$store.dispatch('delete_rank_games', this.form)
      } else {
        this.$store.dispatch('delete_rank_register', this.form)
      }
      this.$bvModal.show('modal-add')
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onSubmit (event) {
      event.preventDefault()
      if (this.$route.params.type === 'rank_games') {
        this.$store.dispatch('put_rank_games', this.form)
      } else {
        this.$store.dispatch('put_rank_register', this.form)
      }
      this.$bvModal.show('modal-add')
    },
    get_name_rank () {
      if (this.form.group_id === '') {
      }
      axios
        .get(this.$store.state.path_to_server + 'group_name/?id=' + this.form.group_id)
        .then(response => (this.form.rank_name = response.data.name))
    }
  },
  mounted () {
    this.form.type = this.$route.params.type
    this.form.id = this.$route.params.id
    if (this.$route.params.action === 'modify') {
      this.form.rank_name = this.$route.params.name_rank
      this.form.group_id = this.$route.params.group_id
      this.form.path = this.$route.params.path
      if (this.$route.params.type === 'rank_games') {
        this.form.group_name = this.$route.params.misc
        this.form.sort_id = this.$route.params.sort_id
      }
    }
    if (this.$route.params.type === 'rank_games' && this.$route.params.action === 'add') {
      this.form.group_name = this.$route.params.misc
      this.form.sort_id = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
#main {
    background-color:#3b4650;
}
#main_content {
    position: absolute;
    text-align: left;
    color: black;
    overflow: auto;
    float: left;
    display: flex;
    max-height: 80vh;
    max-width: none;
    margin-top: 100px;
    left: 50%;
    transform: translate(-50%);
}
#form {
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
    margin-right: 4px;
}
.button_back {
    float: left;
}
.button_get {
    position: relative;
    top: 0;
    left: 0;
    margin-left: 5px;
    transform: none;
}

</style>
