<template>
<div id= "nav_siedbar" class="navigation">
    <p class="title_main" v-if="!hidden_siedbar"> Serwer Otavi.pl</p>
    <p class="title_main_mini" v-if="hidden_siedbar"> TS3</p>
    <div class="menu_list" v-for="(component, index) in navElements" v-bind:key="index">
       <router-link :to="{name: component.route_link_name}"><div :class="[component.route_link_name===$route.name ? 'icon_selected': 'icon']"> <i :class="['fas',component.icon]"></i></div>
     <div :class="[hidden_siedbar===true ? 'name_hide' : 'name']">{{ component.name}}
       <div class="staus" v-if="!hidden_siedbar">
         <i :class="['fas',component.status]" :style="{ color: component.color_status }"></i>
       </div>
     </div>
       </router-link>
    </div>
    <p class="title" v-if="!hidden_siedbar"> Twoje konto</p>
    <div class="menu_list" v-for="(component, index) in account_menu" v-bind:key="index+100">
       <router-link :to="{name: component.route_link_name}"><div :class="[component.route_link_name===$route.name ? 'icon_selected': 'icon']"> <i :class="['fas',component.icon]"></i></div>
     <div :class="[hidden_siedbar===true ? 'name_hide' : 'name']">{{ component.name}}
       <div class="staus" v-if="!hidden_siedbar">
         <i :class="['fas',component.status]" :style="{ color: component.color_status }"></i>
       </div>
     </div>
       </router-link>
    </div>
    <p class="title" v-if="!hidden_siedbar"> Serwer</p>
    <div class="menu_list" v-for="(component, index) in server_menu" v-bind:key="index+200">
       <router-link :to="{name: component.route_link_name}"><div :class="[component.route_link_name===$route.name ? 'icon_selected': 'icon']"> <i :class="['fas',component.icon]"></i></div>
     <div :class="[hidden_siedbar===true ? 'name_hide' : 'name']">{{ component.name}}
       <div class="staus" v-if="!hidden_siedbar">
         <i :class="['fas',component.status]" :style="{ color: component.color_status }"></i>
       </div>
     </div>
       </router-link>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import '@fortawesome/fontawesome-free/css/all.css'
export default {
  data () {
    return {
      navElements: [
        {
          icon: 'fa-tachometer-alt',
          route_link_name: 'dashboard',
          name: 'Dashboard',
          status: '',
          color_status: ''
        }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('get_siedbar_content')
    this.$store.dispatch('get_siedbar_content_server')
  },
  computed: {
    ...mapState([
      'account_menu',
      'server_menu',
      'hidden_siedbar'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
.navigation {
    float: left;
    height: 100vh;
    position: fixed;
    padding-top: 0px;
    width: 250px;
    background: #2e3944;
    box-shadow: 5px 0px 8px #2e3944;
    z-index: 2;
    transition: 0.3s;
}
.menu_list {
    margin-top: 10px;
}
.name:hover >.icon{
    border-left: 5px solid #3e84c1;
    color: black;
}
.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    cursor: pointer;
    color: #fefefe;
    background-color: #ffc107;
    float: left;
    }
.icon_selected {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    cursor: pointer;
    color: #fefefe;
    background-color: #ffc107;
    float: left;
    border-left: 5px solid #3e84c1;
    }
.icon:hover +.name{
    background-color: #ffc107;
 }
.name {
    font-family: 'Itim', cursive;
    float: left;
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    width: 210px;
    background-color: #242424;
    color: #fff;
}
.name_hide {
  visibility: hidden;
  font-family: 'Itim', cursive;
  width: 140px;
  height: 40px;
  background-color: #242424;
  align-items: center;
  justify-content: center;
  color: #fff;
  display: flex;
  /* Position the tooltip */
  position: fixed;
  z-index: 0;
  left: 40px;

}
.icon:hover +.name_hide{
    visibility: visible;
 }
 .icon_selected:hover +.name_hide{
    visibility: visible;
 }

.name:hover {
    background-color: #ffc107;
}
.title{
    font-family: 'Itim', cursive;
    color: #fff;
    font-size: 20px;
}
.title_main{
    font-family: 'Itim', cursive;
    color: #fff;
    font-size: 28px;
    margin-top: 5px;
}
.title_main_mini{
    font-family: 'Itim', cursive;
    color: #fff;
    font-size: 20px;
    margin-top: 10px;
}
a {
    float: left;
}
.staus{
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  left: 210px;
  float: right;
  position: absolute;
}
</style>
