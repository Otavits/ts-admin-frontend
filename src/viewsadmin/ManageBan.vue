<template>
  <div id="main_content">
    <div id="container">
      <b-jumbotron>
        <div class="mytabs">
          <input type="radio" id="tab_ban" name="mytabs" checked="checked" >
          <label  for="tab_ban">Kary  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            <BanTable/>
          </div>
          <input type="radio" id="tab_perm" name="mytabs" >
          <label  for="tab_perm">Uprawnienia  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            <Permissions/>
          </div>
          <input type="radio" id="tab_auto" name="mytabs" >
          <label  for="tab_auto">Auto kary  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            tab_auto
          </div>
          <input type="radio" id="tab_settings" name="mytabs" >
          <label  for="tab_settings">Ustawienia  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            <Settings/>
          </div>
        </div>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import Settings from '../components/ManageBan/Settings'
import Permissions from '../components/ManageBan/Permissions'
import BanTable from '../components/ManageBan/BanTable'
export default {
  name: 'ManageBan.vue',
  components: {
    Settings,
    Permissions,
    BanTable
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
