<template>
  <div id="main_content">
    <div id="container">
      <b-jumbotron>
        <div class="mytabs">
          <input type="radio" id="tab_message" name="mytabs" checked="checked">
          <label for="tab_message">Aktywne wiadomości  <i class="fas fa-comment"></i></label>
          <div class="tab">
            <div v-for="(component, index) in active_message_id" :key="index">
              <ActiveMessage
              />
            </div>
          </div>
          <input type="radio" id="tab_add" name="mytabs">
          <label for="tab_add">Dodaj wiadomość  <i class="fas fa-comment-medical"></i></label>
          <div class="tab">
            <div class="add_message">
              <h2>Tworzenie nowej wiadomości</h2>
              <hr>
              <h3>Treść wiadomości:</h3>
              <b-form-textarea
                  id="textarea"
                  v-model="text"
                  placeholder="Wprowadź treść ...."
                  rows="3"
                  max-rows="6"
              ></b-form-textarea>
              <br>
              <div class="arch">
                <h3>Data auto-archiwizacji:</h3>
                <input type="date" name="bday" value="Wprowadź datę" v-model="date_auto_arch">
              </div>
              <h3>Typ wiadomości:</h3>
              <select class="list_type" v-model="selected_type">
                <option v-for="(option, index) in type_options" v-bind:value="option.value" :key="index">
                  {{ option.text }}
                </option>
              </select>
              <br>
              <h4 v-if="selected_type === 'group'">Odbiorcy:</h4>
              <div class="recipment" v-if="selected_type === 'group'">
                <div class="box">
                  <h3 >Grupy użytkowników:</h3>
                  <div class="list" v-for="(user_rank, index) in user_rank" :key="index">
                    <b-form-checkbox
                        :id=user_rank.rank_name
                        v-model="selected_user"
                        :name=user_rank.rank_name
                        :value=user_rank.rank_id
                        :unchecked-value=null
                    >
                      {{user_rank.rank_name}}
                    </b-form-checkbox>
                  </div>
                </div>
                <div class="box">
                  <h3> Grupy Administarcyjne: </h3>
                  <div class="list" v-for="(staff_rank, index) in staff_rank" :key="index">
                    <b-form-checkbox
                        :id=staff_rank.rank_name
                        v-model="selected_staff"
                        :name=staff_rank.rank_name
                        :value=staff_rank.group_id
                        :unchecked-value=null
                    >
                      {{staff_rank.rank_name}}
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input type="radio" id="tab_arch" name="mytabs">
          <label for="tab_arch">Archiwum wiadomości  <i class="fas fa-comment-slash"></i></label>
          <div class="tab">
            asdasdasdasdasdasd
          </div>
          <input type="radio" id="tab_settings" name="mytabs">
          <label for="tab_settings">Ustawienia  <i class="fas fa-sliders-h"></i></label>
          <div class="tab">
            sadasasdda
          </div>
        </div>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import ActiveMessage from '../components/ActiveMessage'
import { mapState } from 'vuex'
export default {
  name: 'ManageMessage',
  components: {
    ActiveMessage
  },
  data () {
    return {
      active_message_id: [1, 2, 3],
      date_auto_arch: '',
      selected_staff: [],
      selected_user: [],
      selected_type: null,
      type_options: [
        { value: null, text: 'Wybierz rodzaj wiadomości' },
        { value: 'all', text: 'Wiadomość dla wszsytkich użytkowników' },
        { value: 'group', text: 'Wiadomość dla grup użytkowników' },
        { value: 'single', text: 'Wiadomość dla jednego użytkownika' }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('get_staff_rank')
    this.$store.dispatch('get_user_rank')
  },
  computed: {
    ...mapState([
      'staff_rank',
      'user_rank'
    ])
  }
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
// Import custom SASS variable overrides, or alternatively
// define your variable overrides here instead

// Import Bootstrap and BootstrapVue source SCSS files
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

// General style overrides and custom classes

#main_content {
  text-align: left;
  padding-right: 10px;
  float: left;
  color: black;
  margin-top: 10px;
  width:100%;
  overflow: auto;

}
#container {
  margin-top: 80px;
  margin-left: 10px;
  margin-right: 10px;
}
.jumbotron {
  background-color: #2e3944 !important;
}
.mytabs {
  display: flex;
  flex-wrap: wrap;
}
.mytabs input[type="radio"] {
  display: none;
}
.mytabs label {
  font-family: 'Itim', cursive;
  background: #3b4650;
  padding: 25px;
  font-weight: bold;
  margin-bottom: 0px;
  color: #fff;
}
.mytabs .tab {
  background: #242424;
  width: 100%;
  padding: 20px;
  order: 1;
  display: none;
  color: #fff;
}
.mytabs input[type="radio"]:checked + label + .tab {
  display: block;
}
.mytabs input[type="radio"]:checked + label {
  background: #242424;
}
.mytabs input[type="radio"]:not(:checked):hover + label {
  background: #ffc107;
}
.mytabs label i {
  font-size: 20px;
}
.add_message {
  background: #3b4650;
  border-radius: 8px;
  padding: 20px;
}
.add_message h2 {
  color: #ffc107;
  font-size: 25px;
  margin-bottom: 10px;
}
.add_message h3 {
  font-size: 18px;
  margin-bottom: 10px;
  display: inline-block;
}
.add_message h4 {
  text-align: center;
  margin-top: 8px;
}
.add_message hr {
  height:2px;
  border-width: 0px;
  border-radius: 1px;
  color: #E87538;
  background-color: #E87538;
}
textarea.form-control {
  background-color: #242424;
  color: white;
  border-color: #242424;
  overflow: auto !important;
}
textarea.form-control:focus {
  background-color: #242424;
  color: white;
  border-color: #E87538;
  box-shadow: 0 0 0 0.2rem rgb(232 117 56 / 25%);
}
textarea.form-control::selection {
  background-color: #E87538;
  color: white;
}
::-webkit-scrollbar{
  background: #242424;
  width: 14px;
}
::-webkit-scrollbar-track{
  box-shadow: inset 0 0 10px #00000070;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb{
  background: linear-gradient(125deg,#E87538,#ffc107);
  border-radius: 10px;
}
.add_message input[type="date"] {
  background-color: #242424;
  border-radius: 8px;
  color: #fff;
  border: none;
  padding: 5px;
  margin-left: 3px;
}
.add_message input[type="date"]::selection {
  background-color: #E87538 !important;
  color: white;
}
::-webkit-calendar-picker-indicator {
  background-color: #242424 !important;
}
.arch {
  vertical-align: middle;
  margin: 10px;
  margin-left: 0px;
}
.recipment {
  display: flex;
  justify-content: space-around;
}
.box {
  background-color: #242424;
  padding: 5px;
  border-radius: 8px;
}
.list {
  display: flex;
}
.list_type {
  background-color: #242424;
  color: #fff;
  border-color: #242424;
  padding: 5px;
  margin-left: 5px;
}
.list_type:focus {
  border-color: #E87538;
  box-shadow: 0 0 0 0.2rem rgb(232 117 56 / 25%);
}
.list_type::selection {
  background-color: #E87538 !important;
}
.list_type option:hover {
  background-color: white !important;
}
option:hover {
  background-color: yellow;
}
</style>
