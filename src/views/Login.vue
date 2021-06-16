<template>
  <div id="login">
        <b-alert v-model="show_error" variant="danger" dismissible>
     {{ error_text }}
    </b-alert>
    <div id="form">
    <b-form >
      <b-form-group
        id="input-group-1"
        label="Podaj swój email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          placeholder="Wprowadź email"
          type="email"
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
      <b-button variant="primary">Zaloguj sie</b-button>
    </b-form>
    </div>
  </div>
</template>

<script>
// import router from '@/router'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      this.$store.dispatch('login', {
        email: this.form.email,
        password: this.form.password
      }).then(() => {
        this.$router.push({ name: 'home' })
      })
      // router.push('/')
    }
  }

}
</script>

<style lang="scss" scoped>
.btn {
    margin:  5px;
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
@media screen and (max-device-width: 660px) {
    #login{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    }
    }
</style>
