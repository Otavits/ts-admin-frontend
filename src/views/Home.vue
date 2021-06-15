<template>
  <div>
  <LoginForm v-if="!selected_login_db"/>
  <VerifyToken v-if="selected_login_db"/>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
import VerifyToken from '../components/VerifyToken.vue'
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
  components: {
    LoginForm,
    VerifyToken
  },
  computed: {
    ...mapState([
      'selected_login_db'
    ])
  }
}
</script>
