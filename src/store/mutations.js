import axios from 'axios'
// import state from './state'
export default {
  SET_USER_DATA (state, userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    axios.defaults.headers.common.Authorization = `Bearer ${
      userData.token
    }`
  },
  CLEAR_USER_DATA () {
    // state.user = null
    localStorage.removeItem('user')
    // axios.defaults.headers.common.Authorization = null
    window.location.reload()
  },
  SET_LIST_ONLINE (state, data) {
    state.onlinelist = data
  },
  set_dbid_to_login (state, DBID) {
    state.selected_login_db = DBID
  },
  SET_ACCOUNT_MENU (state, data) {
    state.account_menu = data
  },
  SET_SERVER_MENU (state, data) {
    state.server_menu = data
  },
  SET_RANK_GENDER (state, data) {
    state.rank_gender = data
  },
  SET_RANK_PROVINCE (state, data) {
    state.rank_province = data
  },
  SET_STAF_RANK (state, data) {
    state.staff_rank = data
  },
  SET_STAF_LIST (state, data) {
    state.staff_list = data
  },
  SET_USER_LIST (state, data) {
    state.user_list = data
  },
  SET_IP (state, data) {
    state.ip = data
  },
  SET_STATUS_SIEDBAR (state, data) {
    state.hidden_siedbar = data
  },
  SET_GAME_GROUP_LIST (state, data) {
    state.group_games_list = data
  },
  SET_USER_RANK (state, data) {
    state.user_rank = data
  },
  SET_USER_SEARCH_LIST (state, data) {
    this.state.user_list_to_search = data
  },
  SET_LIST_ALL_USER_IN_DB (state, data) {
    this.state.list_all_user_in_db = data
  },
  SET_STATUS_TOKEN_CHECKED (state) {
    this.state.status_token_checked = true
  }
}
