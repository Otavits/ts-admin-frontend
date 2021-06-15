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
    return axios.post(this.state.path_to_server + 'public/login', credentials, { headers }).then(
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
    return axios.get(this.state.path_to_server + 'isonline', { headers }).then(
      ({ data }) => {
        commit('SET_LIST_ONLINE', data)
      }
    )
  },
  create_temp_token ({ commit }, DBID) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'set_temp_token/' + DBID.DBID, { headers }).then(
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
    return axios.post(this.state.path_to_server + 'register/nonaccount/', DBID, { headers }).then(
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
    return axios.get(this.state.path_to_server + 'get_siedbar/account/', { headers }).then(
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
    return axios.get(this.state.path_to_server + 'get_siedbar/server/', { headers }).then(
      ({ data }) => {
        commit('SET_SERVER_MENU', data)
      }
    ).catch(error => {
      console.log(error.response.data.message || error.message)
      console.log(error.response.data.detail || error.message)
    }
    )
  },
  rank ({ commit }, REQUEST) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'rank/?type=' + REQUEST.type + '&action=' + REQUEST.action + '&id=' + REQUEST.id + '&rank_name=' + REQUEST.rank_name + '&group_id=' + REQUEST.group_id + '&path=' + REQUEST.path, { headers }).then(
      ({ data }) => {
        if (REQUEST.type === 'rank_gender' && REQUEST.action === 'get') {
          commit('SET_RANK_GENDER', data)
        } else if (REQUEST.type === 'rank_province' && REQUEST.action === 'get') {
          commit('SET_RANK_PROVINCE', data)
        }
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
    return axios.post(this.state.path_to_server + 'get_DBID_by_uid/', DATA, { headers }).then(
      ({ data }) => {
        commit('set_dbid_to_login', data.DBID)
      }
    )
  },
  get_staff_list ({ commit }, DATA) {
    const headers = {
      'Content-Type': 'application/json'
    }
    return axios.get(this.state.path_to_server + 'staff/staff_list/', { headers }).then(
      ({ data }) => {
        commit('SET_STAF_LIST', data)
      }
    )
  },
  get_user_list ({ commit }, DATA) {
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
    return axios.get(this.state.path_to_server + 'public/get_ip', { headers }).then(
      ({ data }) => {
        commit('SET_IP', data.client_host)
      }
    )
  }
}
