<template>
    <div>
        <div id="main_content">
            <div id="gender">
                <b-jumbotron  lead="Uprawnienia i rangi administracyjne">
                        <b-table class="table"
                        :items="staff_rank"
                        :fields="fields"
                        :hover="true"
                        @row-clicked="rowclick_staffrank"
                        >
                        </b-table>
                        <router-link :to="{ name: 'rankstaffform', params: { action: 'add', id: 0}}"><b-button class="button" variant="primary">Dodaj nową</b-button></router-link>
                </b-jumbotron>
            </div>
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
      fields: [{ key: 'id', label: 'Lp ' }, { key: 'rank_name', label: 'Nazwa rangi' }, { key: 'rank_id', label: 'Id rangi' }]
    }
  },
  methods: {
    rowclick_staffrank (item, index, event) {
      this.$router.push({ name: 'rankstaffform', params: { action: 'modify', id: index + 1 } })
    }
  },
  mounted () {
    this.$store.dispatch('get_staff_rank')
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
    text-align: left;
    color: black;
    overflow: auto;
    display: flex;
    max-width: none;
    margin-top: 70px;
    left: 50%;
    transform: translate(-50%);
    display: block;
}
#gender {
    color: black;
    text-align: center;
    font-family: 'Noto Sans', sans-serif;
}
#province {
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
}
</style>
