<template>
  <div id="main_content">
    <div id="container">
      <b-jumbotron>
        <div class="mytabs">
          <input type="radio" id="tab_info" name="mytabs" checked="checked" >
          <label  for="tab_info">Informacje ogólne  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            <div class="grid-container">
              <div class="nick">
                <InfoTabUserCard
                label="Nick"
                :content="base_data.Nick"
                icon="far fa-user"
                :status_load="api_loaded.api_base"
                />
              </div>
              <div class="dbid">
                <InfoTabUserCard
                  label="DBID"
                  :content="base_data.DBID"
                  icon="fas fa-key"
                  :status_load="api_loaded.api_base"
                />
              </div>
              <div class="uid">
                <InfoTabUserCard
                  label="UID"
                  :content="base_data.UID"
                  icon="fas fa-fingerprint"
                  :status_load="api_loaded.api_base"
                  :small_content=true
                />
              </div>
              <div class="many_ban">
                <InfoTabUserCard
                  label="Ilość kar"
                  content="0"
                  icon="fas fa-skull-crossbones"
                  :status_load=true
                  :small_content=true
                />
              </div>
              <div class="points">
                <InfoTabUserCard
                  label="Punkty"
                  content="2500pkt"
                  icon="fas fa-coins"
                  :status_load=true
                  :small_content=true
                />
              </div>
              <div class="desc">
                <InfoTabUserCard
                  label="Opis"
                  :content="base_data_info.description"
                  icon="fas fa-comment-dots"
                  :status_load="api_loaded.api_info"
                  :small_content=true
                />
              </div>
              <div class="client_version">
                <InfoTabUserCard
                  label="Wersja klienta"
                  :content="base_data_misc.platform + ' ' + base_data_misc.client_version"
                  icon="fas fa-laptop"
                  :status_load="api_loaded.api_misc"
                  :small_content=true
                />
              </div>
              <div class="ststus">
                <InfoTabUserCard
                  label="Status"
                  content="Błąd"
                  icon="fas fa-heartbeat"
                  :status_load=true
                  :small_content=true
                />
              </div>
              <div class="show_timing">
                <TimingTabCard/>
              </div>
              <div class="show_connect">
              <ConnectTabUserCard
                :status_load=api_loaded.api_info
                :info_data="base_data_info"
              />
              </div>
              <div class="table_last_nick">
                <LastNickTabUserCard/>
              </div>
              <div class="table_last_ip">
                <LastIpTabUserCard/>
              </div>
              <div class="warn">
                Warn
              </div>
            </div>
          </div>
          <input type="radio" id="tab_esw" name="mytabs" >
          <label  for="tab_esw">ESW  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            ESW
          </div>
          <input type="radio" id="tab_rank" name="mytabs" >
          <label  for="tab_rank">Rangi  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            Rangi
          </div>
          <input type="radio" id="tab_channel" name="mytabs" >
          <label  for="tab_channel">Kanały  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            Kanały
          </div>
          <input type="radio" id="tab_vip" name="mytabs" >
          <label  for="tab_vip">VIP  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            VIP
          </div>
          <input type="radio" id="tab_log" name="mytabs" >
          <label  for="tab_log">Logi  <i class="fas fa-comment" ></i></label>
          <div class="tab">
            Logi
          </div>
        </div>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
import InfoTabUserCard from '../components/UserCard/InfoTab_UserCard'
import ConnectTabUserCard from '../components/UserCard/ConnectTab_UserCard'
import TimingTabCard from '../components/UserCard/TimingTab_UserCard'
import LastIpTabUserCard from '../components/UserCard/LastIpTab_UserCard'
import LastNickTabUserCard from '../components/UserCard/LastNickTab_UserCard'
import axios from 'axios'
export default {
  name: 'UserCard.vue',
  components: {
    InfoTabUserCard,
    ConnectTabUserCard,
    TimingTabCard,
    LastIpTabUserCard,
    LastNickTabUserCard
  },
  data () {
    return {
      api_loaded: {
        api_base: false,
        api_info: false,
        api_misc: false
      },
      base_data: {
        DBID: 0,
        UID: '',
        Nick: '',
        id: 0,
        IP: ''
      },
      base_data_info: {
        id: 0,
        DBID: 0,
        total_connections: 0,
        real_total_connections: 0,
        created: 0,
        last_connect: 0,
        myteamspeak_id: '',
        description: ''
      },
      base_data_misc: {
        id: 0,
        DBID: 0,
        client_badges: '',
        client_country: '',
        client_version: '',
        platform: ''
      }
    }
  },
  mounted () {
    const headers = {
      'Content-Type': 'application/json'
    }
    axios
      .get(this.$store.state.path_to_server + 'staff/get_user_info_dash_board_base_/' + this.$route.params.dbid, { headers })
      .then(response => {
        this.base_data = response.data
        this.api_loaded.api_base = true
      })
    axios
      .get(this.$store.state.path_to_server + 'staff/get_user_info_dash_board_base_info/' + this.$route.params.dbid, { headers })
      .then(response => {
        this.base_data_info = response.data
        this.api_loaded.api_info = true
        if (response.data.description === '') {
          this.base_data_info.description = 'BRAK USTAWIONEGO OPISU'
        }
      })
    axios
      .get(this.$store.state.path_to_server + 'staff/get_user_info_dash_board_base_misc/' + this.$route.params.dbid, { headers })
      .then(response => {
        this.base_data_misc = response.data
        this.api_loaded.api_misc = true
      })
  }
}
</script>

<style scoped>
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
  padding-bottom: 40px;
  padding-top: 40px;
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
.grid-container {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-template-rows: auto;
  grid-gap: 10px;
  background-color: #3b4650;
  padding: 10px;
  border-radius: 8px;
}
.grid-container > div {
  background-color: #242424;
  border-radius: 8px;
  overflow: hidden;
}
.uid {
  grid-column-start: 3;
  grid-column-end: 5;
}
.desc {
  grid-column-start: 1;
  grid-column-end: 4;
}
.client_version {
  grid-column-start: 4;
  grid-column-end: 6;
}
.show_timing {
  grid-column-start: 1;
  grid-column-end: 4;
}
.show_connect {
  grid-column-start: 4;
  grid-column-end: 7;
}
.table_last_nick{
  grid-column-start: 1;
  grid-column-end: 4;
}
.table_last_ip{
  grid-column-start: 4;
  grid-column-end: 7;
}
.warn{
  grid-column-start: 1;
  grid-column-end: 7;
}

</style>
