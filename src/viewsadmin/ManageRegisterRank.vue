<template>
    <div>
        <div id="main_content">
                <div id="gender">
                    <b-jumbotron  lead="Lista rang dostępnych dla użytkownika podczas rejestracji">
                        <p>Sekcja Płeć</p>
                        <p>Użytkownik podczas procesu rejestracji będzie widzieć te rangi. Aby dokonać modyfikacji danej rangi, kliknij na wiersz.</p>
                            <b-table class="table"
                            :items="rank_gender"
                            :fields="fields"
                            :hover="true"
                            @row-clicked="rowclick_gender"
                            >
                            </b-table>
                            <router-link :to="{ name: 'rankform', params: { type: 'rank_gender', action: 'add', id: 0 , name_rank: 'null', group_id: 'null', path: 'null', misc: 'null', sort_id: 'null'}}"><b-button class="button" variant="primary">Dodaj nową</b-button></router-link>
                    </b-jumbotron>
                </div>
                <br>
                <div id="province">
                    <b-jumbotron  lead="Lista rang dostępnych dla użytkownika podczas rejestracji">
                        <p>Sekcja Płeć</p>
                        <p>Użytkownik podczas procesu rejestracji będzie widzieć te rangi. Aby dokonać modyfikacji danej rangi, kliknij na wiersz.</p>
                            <b-table class="table"
                            :items="rank_province"
                            :fields="fields"
                            :hover="true"
                            @row-clicked="rowclick_province"
                            >
                            </b-table>
                            <router-link :to="{ name: 'rankform', params: { type: 'rank_province', action: 'add', id: 0 , name_rank: 'null', group_id: 'null', path: 'null', misc: 'null', sort_id: 'null' }}"><b-button class="button" variant="primary">Dodaj nową</b-button></router-link>
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
      fields: [{ key: 'id', label: 'Lp ' }, { key: 'rank_name', label: 'Nazwa rangi' }, { key: 'group_id', label: 'Id grupy' }, { key: 'path', label: 'Ścieżka do ikony' }],
      request: {
        action: null,
        id: null,
        type: null,
        rank_name: null,
        group_id: 0,
        path: null
      },
      request2: {
        action: null,
        id: null,
        type: null,
        rank_name: null,
        group_id: 0,
        path: null
      }
    }
  },
  methods: {
    rowclick_gender (item, index, event) {
      this.$router.push({ name: 'rankform', params: { type: 'rank_gender', action: 'modify', id: index + 1, name_rank: this.rank_gender[index].rank_name, group_id: this.rank_gender[index].group_id, path: this.rank_gender[index].path, misc: 'null', sort_id: 'null' } })
    },
    rowclick_province (item, index, event) {
      this.$router.push({ name: 'rankform', params: { type: 'rank_province', action: 'modify', id: index + 1, name_rank: this.rank_province[index].rank_name, group_id: this.rank_province[index].group_id, path: this.rank_province[index].path, misc: 'null', sort_id: 'null' } })
    }
  },
  mounted () {
    this.request.action = 'get'
    this.request.type = 'rank_province'
    this.request.id = 0
    this.$store.dispatch('rank', this.request)
    this.request2.action = 'get'
    this.request2.type = 'rank_gender'
    this.request2.id = 0
    this.$store.dispatch('rank', this.request2)
  },
  computed: {
    ...mapState([
      'rank_gender',
      'rank_province'
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
