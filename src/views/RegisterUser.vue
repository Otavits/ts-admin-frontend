<template>
  <div id="registerform">
    <b-jumbotron  lead="Załóż konto off-line">
              <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      Wprowadź poprawny UID!
    </b-alert>
    <b-alert v-model="show_error" variant="danger" dismissible>
     {{ error_text }}
    </b-alert>
      <hr class="my-4">
  <p>Pamiętaj aby utwozyć konto do logowania offline musisz być zalogowany na TeamSpeak' w momencie zakładania tego konta.</p>
  <p><b>Podaj swoje dane:</b></p>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-2" >
        <b-form-input
          id="input-2"
          v-model="form.login"
          placeholder="Wprowadź swój login"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3">
        <b-form-input
          id="input-3"
          v-model="form.uid"
          placeholder="Wprowadź swój uid na Ts3"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4">
        <b-form-input
          type="password"
          :state="passwordvalidation"
          id="input-4"
          v-model="form.password"
          placeholder="Wprowadź twoje hasło"
          required
        ></b-form-input>
        <b-form-invalid-feedback :state="passwordvalidation">
        Twoje hasło musi mieć mimimum 8 znaków, zawierać małe i duże litery oraz znaki specjalne.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="passwordvalidation">
        Ok.
      </b-form-valid-feedback>
      </b-form-group>
      <b-form-group id="input-group-5">
        <b-form-input
          type="password"
          id="input-5"
          v-model="form.retypepassword"
          placeholder="Wprowadź ponownie twoje hasło"
          required
          :state="ifsame"
        >
        </b-form-input>
        <b-form-invalid-feedback :state="ifsame">
        Wprowadzone hasła różnią sie od siebie
      </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-6" label="Token otrzymany na teamspeak'u" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.token"
          placeholder="Wprowadź token"
          required
        ></b-form-input>
      </b-form-group>
      <b-button variant="warning" @click="generate_token">Wygeneruj token</b-button>
      <br>
      <b-button type="reset" variant="danger">Wyczyść</b-button>
      <b-button type="submit" variant="primary" :disabled="checkdbid || !ifsame || !passwordvalidation">Załóż konto</b-button>
    </b-form>
    </b-jumbotron>
      <b-modal id="confirm-register" hide-footer>
          <template #modal-title>
          Konto zostało utworzone
          </template>
          <b-button variant="success" block @click="goLogin">Ok</b-button>
      </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import router from '@/router'
export default {
  data () {
    return {
      form: {
        login: '',
        uid: '',
        password: '',
        retypepassword: '',
        token: ''
      },
      showDismissibleAlert: false,
      show_error: false,
      error_text: null
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      this.form.dbid = this.selected_login_db
      this.$store.dispatch('register', this.form).catch(error => {
        if (error.response.data.detail === 'Login already registered') {
          this.error_text = 'Login jest już w użyciu'
          this.show_error = true
        } else if (error.response.data.detail === 'DBID already registered') {
          this.error_text = 'UID jest już w użyciu'
          this.show_error = true
        } else if (error.response.data.detail === 'Token is invalid') {
          this.error_text = 'Token weryfikacyjny jest nieprawidłowy'
          this.show_error = true
        }
      }).then(data => {
        if (data.Status === 'succes') {
          this.$store.commit('set_dbid_to_login', null)
          this.$bvModal.show('confirm-register')
        }
      })

      // router.push('/')
    },
    goLogin () {
      this.$router.push({ name: 'loginuser' })
    },
    onReset (event) {
      event.preventDefault()
      this.form.login = ''
      this.form.uid = ''
      this.form.password = ''
      this.form.retypepassword = ''
      this.form.token = ''
    },
    generate_token (event) {
      if (this.form.uid === '') {
        this.showDismissibleAlert = true
      } else {
        this.$store.dispatch('get_dbid_by_uid', this.form)
      }
    }
  },
  computed: {
    checkdbid () {
      if (this.selected_login_db !== 0 && this.selected_login_db !== null) {
        return false
      }
      return true
    },
    passwordvalidation () {
      if (this.form.password.length >= 8 && /\d/.test(this.form.password) && /[a-z]/.test(this.form.password) && /[A-Z]/.test(this.form.password) && /[!@#$%^&*)(+=._-]/.test(this.form.password)) {
        return true
      }
      return false
    },
    ifsame () {
      return this.form.password === this.form.retypepassword && this.form.retypepassword.length !== 0
    },
    ...mapState([
      'selected_login_db'
    ])
  }
}
</script>

<style lang="scss" scoped>
.btn {
    margin:  5px;
}
#registerform {
    width: 390px;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}
#login {
    background-color:#3b4650;
}
#form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: left;
}
.jumbotron {
    padding: 50px 32px 32px 32px;
}
@media screen and (max-device-width: 660px) {
    #registerform{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    }
    }
</style>
