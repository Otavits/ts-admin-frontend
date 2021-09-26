<template>
  <div class="main">
    <div class="dropdown">
      <input  v-if="Object.keys(selectedItem).length === 0" ref="dropdowninput" v-model.trim="inputValue"  class="dropdown-input" type="text" placeholder="Znajdź użytkownika" />
      <div v-else @click="resetSelection" class="dropdown-selected">
        {{ selectedItem.Nick }}
      </div>
      <div v-show="inputValue && apiLoaded" class="dropdown-list">
        <div @click="selectItem(item)" v-show="itemVisible(item)" v-for="item in itemList.users" :key="item.DBID" class="dropdown-item">
          {{ item.Nick }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchUser.vue',
  props: {
    selected: null
  },
  data () {
    return {
      itemList: [],
      apiLoaded: false,
      inputValue: '',
      selectedItem: {}
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios
        .get(this.$store.state.path_to_server + 'public/list_user_search/', { headers })
        .then(response => {
          this.itemList = response.data
          this.apiLoaded = true
          if (Object.keys(this.selected).length !== 0) {
            this.selectedItem = this.selected
          }
        })
    },
    itemVisible (item) {
      const currentName = item.Nick.toLowerCase()
      const currentInput = this.inputValue.toLowerCase()
      return currentName.includes(currentInput)
    },
    selectItem (theItem) {
      this.selectedItem = theItem
      this.inputValue = ''
      this.$emit('on-item-selected', theItem)
    },
    resetSelection () {
      this.selectedItem = {}
      this.$nextTick(() => this.$refs.dropdowninput.focus())
      this.$emit('on-item-reset')
    }
  }
}

</script>

<style scoped>
.main {
  padding: 1px;
  margin-bottom: 10px;
  width: 350px;
}
.dropdown{
  position: relative;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  height: auto;
}
.dropdown-input, .dropdown-selected{
  width: 100%;
  padding: 5px 16px;
  border: 1px solid transparent;
  background: #242424;
  line-height: 1.5em;
  outline: none;
  border-radius: 8px;
  color: #fff;
}
.dropdown-input:focus, .dropdown-selected:hover{
  border-color: #E87538;
  box-shadow: 0 0 0 1.8px rgba(232, 117, 56, 0.25);
}
.dropdown-input::placeholder{
  opacity: 0.7;
}
.dropdown-selected{
  font-weight: bold;
  cursor: pointer;
}
.dropdown:hover >.dropdown-list{
  display: inline-block;
}
.dropdown-input:focus +.dropdown-list{
  display: inline-block;
}
.dropdown-list{
  width: 100%;
  margin-top: 4px;
  max-height: 100px;
  overflow-y: auto;
  background: #242424;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 10px;
  display: none;
}

.dropdown-item{
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
  color: #fff;
}
.dropdown-item:hover{
  background: #ffc107;
}

.dropdown-item-flag{
  max-width: 24px;
  max-height: 18px;
  margin: auto 12px auto 0px;
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
</style>
