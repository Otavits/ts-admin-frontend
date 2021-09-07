<template>
  <div id="main">
    <b-card class="card_form" :title=message.title   >
      <b-card-sub-title class="subtitle">{{message.date | date_format(message.author)}}</b-card-sub-title>
      <b-card-text class="content-text">
        <div class="recipient"> Widoczne dla: {{ message.recipient }}</div>
        {{ message.content }}
        <div class="button-group">
          <b-button squared class="button" >Archwizuj</b-button>
          <b-button squared class="button" >Modyfikuj</b-button>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'ActiveMessage',
  data () {
    return {
      message: {
        title: 'Witaj Świecie',
        date: 1629044321,
        author: 'ordenix',
        recipient: 'Administratorzy',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur commodo nulla, sit amet blandit turpis convallis in. In rutrum et urna vitae sollicitudin. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam sollicitudin ante in metus commodo, eleifend lacinia metus luctus. Curabitur congue diam et risus hendrerit, ac ultricies orci molestie. Vestibulum at enim sodales, tincidunt nisl sodales, accumsan erat. Ut vel rutrum est, vitae sollicitudin mauris. Aenean quis leo vel ex pharetra aliquet. Aenean molestie in purus nec blandit. Praesent ex sapien, feugiat sed magna ut, finibus luctus erat. Aenean a mi tristique eros pulvinar pulvinar vitae vitae ligula. Proin mauris quam, sodales id dui sed, congue ornare purus.'
      }
    }
  },
  filters: {
    date_format: function (value, arg1) {
      if (!value) return ''
      var date = new Date(value * 1000)
      return (date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' przez ' + arg1)
    }
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
