<template>
  <div>
    <b-card class="card_form" :title=message.title   >
      <b-card-sub-title class="subtitle">{{message.date | date_format(message.author)}}</b-card-sub-title>
      <b-card-text class="content-text">
        {{ message.content }}
        <b-button squared class="button" v-if="false">Przeczytano</b-button>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'message.vue',
  props: {
    message_id: null
  },
  data () {
    return {
      message: {
        title: 'Nowa wersja systemu',
        date: 1637838439,
        author: 'ordenix',
        content: 'Dziś wprowadzono nową wersję systemu V-2A. Zmiany dotyczą dopracowania rejestracji użytkownika oraz wyboru rang gier. Na serwerze w ciągu najbliższych dni zostanie zablokowana możliwość nadawania rang gier za pomocą Ts3'
      }
    }
  },
  filters: {
    date_format: function (value) {
      if (!value) return ''
      const date = new Date(value * 1000)
      const convert = a => (a < 10) ? '0' + a : a
      return (convert(date.getDate()) + '-' + convert(date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + convert(date.getHours()) + ':' + convert(date.getMinutes()) + ':' + convert(date.getSeconds()))
    }
  }
}
</script>

<style scoped>
.card_form {
  background-color: #3b4650;
  color: #111117;
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
}
.button:hover {
  background-color: rgba(36, 36, 36, 0.27);
}
</style>
