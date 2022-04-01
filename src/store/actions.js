import axios from 'axios'
export default {
  register ({ commit }, credentials) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.post(this.state.path_to_server + 'public/register', credentials, { headers }).then(
      ({ data }) => {
        return data
      }
    )
  },
  login ({ commit }, credentials) {
    const headers = {
      'Content-Type': 'application/json'
    }
    console.log(this.$web_path)
    return axios.post(this.state.path_to_server + 'public/account-login', credentials, { headers }).then(
      ({ data }) => {
        commit('SET_USER_DATA', data)
      }
    )
  },
  logout ({ commit }) {
    commit('CLEAR_USER_DATA')
  },
  get_list_login ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'public/On-Line-Client-By-Ip', { headers }).then(
      ({ data }) => {
        commit('SET_LIST_ONLINE', data)
        /* const TestData = [{ DBID: 106440, IP: '51.83.179.240', UID: 'VdJdhn5yFA6Um9hz/OzQI/fn/K8=', Nick: 'GIENIA TESTOWA' },
          { DBID: 106445, IP: '51.83.179.240', UID: 'TrsdGyGrqislJ0DA1FSc/QGwrHg=', Nick: 'GIENIA TESTOWA2' },
          { DBID: 106471, IP: '51.83.179.240', UID: 'Zfj51W+NHi0QRorbVge9P/ID2KQ=', Nick: 'GIENIA TESTOWA3' }]
        commit('SET_LIST_ONLINE', TestData) */
      }
    )
  },
  create_temp_token ({ commit }, DBID) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'public/set-Temp-Token/' + DBID.DBID, { headers }).then(
      ({ data }) => {
      }
    )
  },
  select_dbid_to_login ({ commit }, DBID) {
    commit('set_dbid_to_login', DBID.DBID)
  },
  create_auth_nonaccount_token ({ commit }, DBID) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.post(this.state.path_to_server + 'public/non-Account', DBID, { headers }).then(
      ({ data }) => {
        commit('SET_USER_DATA', data)
      }
    ).catch(error => {
      console.log(error.response.data.message || error.message)
      console.log(error.response.data.detail || error.message)
    }
    )
  },
  get_siedbar_content ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'sidebar/account', { headers }).then(
      ({ data }) => {
        commit('SET_ACCOUNT_MENU', data)
      }
    ).catch(error => {
      console.log(error.response.data.message || error.message)
      console.log(error.response.data.detail || error.message)
    }
    )
  },
  get_siedbar_content_server ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'sidebar/server', { headers }).then(
      ({ data }) => {
        commit('SET_SERVER_MENU', data)
      }
    ).catch(error => {
      console.log(error.response.data.message || error.message)
      console.log(error.response.data.detail || error.message)
    }
    )
  },
  rank_gender ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'rank-register/rank-gender', { headers }).then(
      ({ data }) => {
        commit('SET_RANK_GENDER', data)
      }
    ).catch(error => {
      console.log(error.response.data.message || error.message)
      console.log(error.response.data.detail || error.message)
    }
    )
  },
  rank_province ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'rank-register/rank-province', { headers }).then(
      ({ data }) => {
        commit('SET_RANK_PROVINCE', data)
      }
    ).catch(error => {
      console.log(error.response.data.message || error.message)
      console.log(error.response.data.detail || error.message)
    }
    )
  },
  put_rank_register ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.put(this.state.path_to_server + 'staff/rank/rank_register', DATA, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  delete_rank_register ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.delete(this.state.path_to_server + 'staff/rank/rank_register', { data: DATA }, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  get_staff_rank ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'staff/staff_rank/', { headers }).then(
      ({ data }) => {
        commit('SET_STAF_RANK', data)
      }
    ).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  put_staff_rank ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.put(this.state.path_to_server + 'staff/staff_rank/', DATA, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  get_dbid_by_uid ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.post(this.state.path_to_server + 'public/get-dbid-by-uid', DATA, { headers }).then(
      ({ data }) => {
        commit('set_dbid_to_login', data.DBID)
      }
    )
  },
  get_staff_list ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'staff/staff_list/', { headers }).then(
      ({ data }) => {
        commit('SET_STAF_LIST', data)
      }
    )
  },
  get_user_list ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'staff/user_list/', { headers }).then(
      ({ data }) => {
        commit('SET_USER_LIST', data)
      }
    )
  },
  change_role_user ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.put(this.state.path_to_server + 'staff/add_staff_user/', DATA, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  set_privilage_to_staf ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.put(this.state.path_to_server + 'staff/privilage_to_rank/', DATA, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  delete_privilage_to_staf ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.delete(this.state.path_to_server + 'staff/privilage_to_rank', { data: DATA }, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  send_to_register_on_ts3 ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.put(this.state.path_to_server + 'register_user_on_ts3/', DATA, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  get_ip ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'others/get-ip', { headers }).then(
      ({ data }) => {
        commit('SET_IP', data.client_host)
      }
    )
  },
  get_group_rank_list ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'public/rank_game_group_list/', { headers }).then(
      ({ data }) => {
        commit('SET_GAME_GROUP_LIST', data)
      }
    )
  },
  put_rank_games ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.put(this.state.path_to_server + 'staff/rank_game/', DATA, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  delete_rank_games ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.delete(this.state.path_to_server + 'staff/rank_game/', { data: DATA }, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  put_rank_group_games ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.put(this.state.path_to_server + 'staff/rank_game_group_list/', DATA, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  delete_rank_group_games ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.delete(this.state.path_to_server + 'staff/rank_game_group_list/', { data: DATA }, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      }
    )
  },
  set_game_rank ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.put(this.state.path_to_server + 'login/set_rank_games/', DATA, { headers }).catch(
      error => {
        console.log(error.response.data.message || error.message)
        console.log(error.response.data.detail || error.message)
      })
  },
  get_user_rank ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'public/rank_user/', { headers }).then(
      ({ data }) => {
        commit('SET_USER_RANK', data)
      })
  },
  get_user_search_list ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'public/list_user_search/', { headers }).then(
      ({ data }) => {
        commit('SET_USER_SEARCH_LIST', data)
      }
    )
  },
  get_list_all_user_in_db ({ commit }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'staff/get_all_user_list/', { headers }).then(
      ({ data }) => {
        commit('SET_LIST_ALL_USER_IN_DB', data)
      }
    )
  }
}
