<template>
  <div id="login">
            <b-alert v-model="show_error" variant="danger" dismissible>
     {{ error_text }}
    </b-alert>
    <div id="form">
  <b-jumbotron class="jumbo">

    <template #lead >
        <div id="center">Zaloguj sie do systemu</div>
    </template>

    <hr class="my-4">
      <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Podaj swój login:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.login"
          placeholder="Wprowadź login"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Wprowadź hasło" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.password"
          placeholder="Wprowadź hasło"
          required
        ></b-form-input>
      </b-form-group>
      <b-button class="login" type="submit"><log-in-icon size="1.4x" class="custom-class"></log-in-icon> Zaloguj</b-button>
    </b-form>
  </b-jumbotron>
          <div id="fotter">
                  <info-icon size="1.5x"></info-icon>
        Jeśli nie posiadasz konta do logowania  off-line możesz <router-link :to="{name: 'registeruser'}"> założyć </router-link> takie konto
            <p> <info-icon size="1.5x"></info-icon> Jeśli nie pamiętasz hasła, możesz je <router-link :to="{name: 'PasswordRecovery'}"> zresetować </router-link></p>
    </div>
</div>

  </div>
</template>

<script>
import { InfoIcon, LogInIcon } from 'vue-feather-icons'

export default {
  components: {
    InfoIcon,
    LogInIcon
  },
  data () {
    return {
      form: {
        login: '',
        password: ''
      },
      show_error: false,
      error_text: null
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      this.$store.dispatch('login', this.form).then(() => {
        this.$router.push({ name: 'home' })
      }).catch(error => {
        if (error.response.data.detail === 'Incorrect username or password') {
          this.error_text = 'Błędny login lub hasło'
          this.show_error = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
.head {
    font-size: 55px;
}
.list {
    text-align: center;
}
#center{
    text-align: center;
    font-size: 25px;
}
#fotter {
    text-align: center;
    color: #fff;
     position: relative;
     margin-top: 0px;
    padding: 10px 10px 0px 10px;
     bottom: 0;
     width: 300px;
    }
.jumbo{
    padding: 40px 32px 12px 32px;
}
.login {
    background-color: #ffc107;
    color: #3b4650;
    border-color: #ffc107;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 25px;
}
</style>
