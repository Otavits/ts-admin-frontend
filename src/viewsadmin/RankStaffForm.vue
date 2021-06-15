<template>
    <div>
        <div id="main_content">
            <b-jumbotron  lead="Jesteś w trybie edycji rangi administracyjnej">
                <b-form  @submit="onSubmit">
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

                    <b-form-group id="input-group-2" label="Id rangi:" label-for="input-2"
                    description="Ten numer jest nie zmienialny jest to identyfikator wewnętrzny systemu"
                    >
                        <b-form-input
                        id="input-2"
                        v-model="form.rank_id"
                        placeholder="Wprowadź Id grupy"
                        type="number"
                        disabled
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Id grupy administracyjnej na Teamspeak'u" label-for="input-3">
                        <b-form-input
                        id="input-3"
                        v-model="form.group_id"
                        placeholder="Podaj id grupy"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <h4> Uprawnienia w systemie</h4>
                    <h5> Sekcja zarządzanie</h5>
                    <div id="grants">
                    <b-form-checkbox
                        id="checkbox-1"
                        v-model="form.acces_to_register"
                        name="checkbox-1"
                        value="true"
                        unchecked-value="false"
                        >
                        Zarządzanie rangami rejestracyjnymi
                    </b-form-checkbox>
                    <b-form-checkbox
                        id="checkbox-2"
                        v-model="form.acces_to_grant_rank"
                        name="checkbox-2"
                        value="true"
                        unchecked-value="false"
                        >
                        Zarządzanie rangami administarcyjnymi
                    </b-form-checkbox>
                    <b-form-checkbox
                        id="checkbox-3"
                        v-model="form.acces_to_staff_user"
                        name="checkbox-3"
                        value="true"
                        unchecked-value="false"
                        >
                        Zarządzanie administartorami systemu
                    </b-form-checkbox>
                    </div>
                    <br>
                    <br>
                    <br>
                    <br>
                    <div id="button-group">
                    <b-button class="button" type="submit" variant="primary">Zapisz</b-button>
                    <b-button v-if="$route.params.action==='modify'" class="button_get" @click="$bvModal.show('confirm-delete')" variant="danger">Usuń rangę</b-button>
                    <b-button class="button_back" @click="goBack" variant="success">Powrót</b-button>
                    </div>
                    </b-form>
                    <b-modal id="modal-info" hide-footer>
                        <template #modal-title>
                        Zmiany zapisano
                        </template>
                        <b-button class="mt-3" block @click="goBack">Powrót</b-button>
                    </b-modal>
            </b-jumbotron>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      form: {
        id: 0,
        rank_name: '',
        rank_id: 0,
        group_id: '',
        acces_to_register: false,
        acces_to_grant_rank: false,
        acces_to_staff_user: false
      }
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onSubmit (event) {
      event.preventDefault()
      this.$store.dispatch('put_staff_rank', this.form)
      this.$bvModal.show('modal-info')
    }
  },
  mounted () {
    if (this.$route.params.action === 'modify') {
      this.form = this.staff_rank[this.$route.params.id - 1]
    }
  },
  computed: {
    ...mapState([
      'staff_rank'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

#main_content {
    position: absolute;
    text-align: center;
    color: black;
    overflow: auto;
    display: flex;
    max-width: none;
    margin-top: 70px;
    left: 50%;
    transform: translate(-50%);
    display: block;
}
#grants {
    color: black;
    text-align: left;
    font-family: 'Noto Sans', sans-serif;
    float: left;
    left: 0;
    display: block;
    margin-bottom: 10px;
}
#button-group {
    display: block;
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
