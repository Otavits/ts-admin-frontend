<template>
    <div id="Top_Navbar" class=".navbar">
            <div id="left_nav">
                <i class="fas fa-bars" @click="toggle_siedbar"></i>
            </div>
            <div id="right_nav">
                <div class="dropdown2">
                    <div class="avatar">Profil <i class="fas fa-user-circle"></i></div>
                        <div class="content">
                            <p><i class="fas fa-wrench"></i>Ustawienia</p>
                            <p @click="logout"><i class="fas fa-sign-out-alt"></i> Wyloguj</p>
                        </div>
                </div>
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    logout (event) {
      this.$router.push({ name: 'home' })
      this.$store.dispatch('logout')
    },
    toggle_siedbar (event) {
      if (this.hidden_siedbar === false) {
        console.log('set to true')
        document.getElementById('nav_siedbar').style.width = '40px'
        document.getElementById('Top_Navbar').style.left = '40px'
        document.getElementById('main_content_login').style.marginLeft = '48px'
        this.$store.commit('SET_STATUS_SIEDBAR', true)
      } else {
        console.log('set to false')
        document.getElementById('nav_siedbar').style.width = '250px'
        document.getElementById('Top_Navbar').style.left = '250px'
        document.getElementById('main_content_login').style.marginLeft = '258px'
        this.$store.commit('SET_STATUS_SIEDBAR', false)
      }
    }
  },
  computed: {
    ...mapState([
      'hidden_siedbar'
    ])
  }
}
</script>

<style lang="scss">
.navbar{
    position: fixed;
    top: 0px;
    height: 50px;
    right: 0px;
    left: 250px;
    background: #2e3944;
    box-shadow: 0px 8px 8px #2e3944;
    color: white;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    overflow:auto;
    font-family: 'Itim', cursive;
    z-index: 1;
    transition: 0.3s;
}
#right_nav {
    float: right;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    right: 0;
}
#left_nav {
    float: left;
    cursor: pointer;
    align-items: center;
    justify-content: center;
}
#left_nav:hover{
    color: #ffc107;
}
.avatar{
    font-size: 23px;

}
.dropdown2 {
  float: left;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 0px 0px;
}

.dropdown {
  float: left;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.dropdown2 .avatar {
  font-size: 22px;
  border: none;
  outline: none;
  color: white;
  padding: 0px 0px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}
.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 5px 0px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}
.dropdown2:hover .avatar {
  color: #ffc107;
}
.dropdown:hover .dropbtn {
  background-color: red;
}
.content {
   display: none;
  position: fixed;
  background-color: #2e3944;
  min-width: 160px;
  z-index: 1;
  right: 10px;
  box-shadow: 0px 8px 16px 0px #2e3944;
  padding-top: 20px;
}

.dropdown-content {
   display: none;
  position: fixed;
  background-color: #f9f9f9;
  min-width: 160px;
  z-index: 0;
  right: 10px;
}
.content p {
  float: none;
  color: #fff;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #ddd;
}
.content p:hover {
  background-color: #ffc107;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.dropdown2:hover .content {
  display: block;
}

</style>
