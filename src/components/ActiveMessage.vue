<template>
  <div id="main">
    <b-overlay :show="!apiLoaded || !apiLoaded2" rounded="sm" variant="dark">
      <b-card class="card_form" :title=message.title   >
        <b-card-sub-title v-if="apiLoaded===true && apiLoaded2===true"  class="subtitle">{{message.date | date_format(user_list_to_search.users.find(element => element.DBID == message.author).Nick)}}</b-card-sub-title>
        <b-card-text class="content-text">
          <div class="recipient"> Widoczne dla: {{ message.recipient }}</div>
          {{ message.content }}
          <div class="button-group">
            <b-button squared class="button" >Archwizuj</b-button>
            <b-button squared class="button" @click="modify">Modyfikuj</b-button>
          </div>
        </b-card-text>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'ActiveMessage',
  props: {
    message_id: null
  },
  data () {
    return {
      message: {
        title: '',
        date: 0,
        author: '',
        recipient: 'TO DO',
        content: ''
      },
      apiLoaded: false,
      apiLoaded2: false
    }
  },
  computed: {
    ...mapState([
      'user_list_to_search'
    ])
  },
  methods: {
    modify () {
      this.$emit('go_to_modify')
      this.$router.push({ name: 'managemessage', params: { id: this.message_id } })
      window.location.reload()
    }
  },
  filters: {
    date_format: function (value, arg1) {
      if (!value) return ''
      var date = new Date(value * 1000)
      return (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' przez ' + arg1)
    }
  },
  created () {
    if (this.user_list_to_search === null) {
      this.$store.dispatch('get_user_search_list').then(
        this.apiLoaded = true
      )
    } else {
      this.apiLoaded = true
    }
    const payload = { message_id: this.message_id }
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .post(this.$store.state.path_to_server + 'login/get_message_by_id/', payload, { headers })
      .then(response => {
        this.message.title = response.data.title
        this.message.date = response.data.date
        this.message.content = response.data.message
        this.message.author = response.data.author
        this.apiLoaded2 = true
        if (response.data.to_all === true) {
          this.message.recipient = 'Wszystkich'
        }
        if (response.data.to_id !== null) {
          this.message.recipient = this.user_list_to_search.users.find(element => element.DBID === parseInt(response.data.to_id)).Nick
        }
      })
  }
}
</script>

<style scoped>
.card_form {
  background-color: #2e3944;
  color: #fff;
  margin-bottom: 10px;
}
.card-title {
  color: #ffc107;
}
.subtitle {
  color: #E87538 !important;
  margin-bottom: 2px;
  font-size: 12px;
}
.content-text {
  color: #fff;
}
.button {
  right: 0;
  float: right;
  margin-top: 10px;
  background-color: #242424;
  margin-left: 10px;
}
.button:hover {
  background-color: rgba(36, 36, 36, 0.27);
}
.recipient {
  color: #E87538
}
</style>
