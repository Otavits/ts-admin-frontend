<template>
    <div>
        <b-card class="Userform" @click="onCheck">
            <b-card-text>
                <h3> Nick: {{data.nick}} </h3>
                Twój UID: {{data.uid}}
            </b-card-text>
        </b-card>

    </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  methods: {
    onCheck (event) {
      event.preventDefault()
      console.log(this.data.dbid)
      this.$store.dispatch('create_temp_token', {
        DBID: this.data.dbid
      })
      this.$store.dispatch('select_dbid_to_login', {
        DBID: this.data.dbid
      })
      // router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.Userform {
    margin-bottom: 5px;
}
.Userform:hover {
    background: #ffc107;
}

</style>
