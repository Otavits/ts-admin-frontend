<template>
    <div>
        <div id="main_content">
          <b-modal ref="success-modal" hide-footer title="Sukces" >Zmiany zapisano poprawnie!</b-modal>
            <b-alert v-model="alert" variant="danger" dismissible fade>
            Zaznacz właściwą rangę aby przejść dalej!
            </b-alert>
            <b-alert v-model="alert2" variant="danger" dismissible fade>
            Niestety nie spełniasz wymagań aby się zarejestrwoać!
            </b-alert>
            <b-overlay :show="loading" rounded="sm">
            <b-jumbotron header="Rejestracja" :lead="status_rules.status_register ? 'W tym miejscu możesz ponownie wybrać rangi płeć oraz województwo' : 'W tym miejscu możesz sam się zarejestrować wybierając płeć lub województwo. W późniejszym czasie możesz tutaj to zmienić.'">
            <form-wizard
                      v-if="status_rules.status_register==false"
                      @on-complete="submit"
                      :start-index=index_step
                      title=''
                      subtitle=''
                      nextButtonText="Dalej"
                      backButtonText="Wróć"
                      finishButtonText="Zakończ"
                      errorColor="#ff0018"
                      color="#ffc107">
            <tab-content title="Spełnienie wymagań"
            :before-change="validateAsync"
                         icon="fas fa-vote-yea">
              <div id="content">
              Aby mieć możliwośc rejestracji na naszym serwerze należy spełnić następujące wymagania:
              <br>
              <div id="rules">
                <div id="rules_item">
                <div class="checkbox">
                    <b-form-checkbox
                      id="status_rules-1"
                      v-model="status_rules.connect"
                      name="status_rules-1"
                      value="true"
                      unchecked-value="false"
                      :disabled="true"
                    >
                    </b-form-checkbox>
                </div>
                <div class="checkbox">
                    Połączony conajmniej 1 z TS3 Otavi.pl
                </div>
                </div>
                <div id="rules_item">
                <div class="checkbox">
                    <b-form-checkbox
                      id="status_rules-2"
                      v-model="status_rules.time"
                      name="status_rules-2"
                      value="true"
                      unchecked-value="false"
                      :disabled="true"
                    >
                    </b-form-checkbox>
                </div>
                <div class="checkbox">
                    Spełniony czas połączenia z serwerem TS3
                </div>
                </div>
                <div id="rules_item">
                <div class="checkbox">
                    <b-form-checkbox
                      id="status_rules-3"
                      v-model="status_rules.ban"
                      name="status_rules-3"
                      value="true"
                      unchecked-value="false"
                      :disabled="true"
                    >
                    </b-form-checkbox>
                </div>
                <div class="checkbox">
                    Brak kar i ograniczeń
                </div>
                </div>
                <div id="rules_item">
                <div class="checkbox">
                    <b-form-checkbox
                      id="status_rules-4"
                      v-model="status_rules.rules"
                      name="status_rules-4"
                      :value=true
                      :unchecked-value=false
                    >
                    </b-form-checkbox>
                </div>
                <div class="checkbox">
                    Zaakceptowany <a href="https://otavi.pl/wp-content/uploads/2019/07/Regulamin.pdf">regulamin</a>
                </div>
                </div>
              </div>
              </div>
            </tab-content>
            <tab-content title="Wybór płci"
                         icon="fas fa-venus-mars"
                         :before-change="validateGender">
                 <div id="content">
                     Wybierz swoją płeć, ranga ta będzie widoczna przy twoim nicku na naszym TS3
                </div>
                <div id="container">
                    <div id="containers" v-for="(item, index) in rank_gender" v-bind:key="index">
                        <div class="element">
                            <img class="icon" :src="$store.state.path_to_server + 'public/icon/'+item.path">
                        </div>
                        <div class="element">
                            {{ item.rank_name }}
                        </div>
                        <div class="element">
                            <b-form-checkbox
                                :id=item.rank_name
                                v-model="selected_gender"
                                :name=item.rank_name
                                :value=item.group_id
                                :unchecked-value=null
                                >
                            </b-form-checkbox>
                        </div>
                        <br>
                    </div>
                </div>
            </tab-content>
            <tab-content title="Wybór województwa"
                         icon="far fa-compass">
                <div id="container">
                    <div id="containers" v-for="(item, index) in rank_province" v-bind:key="index">
                        <div class="element">
                            <img class="icon" :src="$store.state.path_to_server + 'public/icon/'+item.path">
                        </div>
                        <div class="element2">
                            {{ item.rank_name }}
                        </div>
                        <div class="element">
                            <b-form-checkbox
                                :id=item.rank_name
                                v-model="selected_province"
                                :name=item.rank_name
                                :value=item.group_id
                                :unchecked-value=null
                                >
                            </b-form-checkbox>
                        </div>
                        <br>
                    </div>
                </div>
            </tab-content>
          <template slot="footer" slot-scope="props">
                <div class="wizard-footer-left">
                    <b-button class="button" variant="warning" v-if="!props.activeTabIndex == 0" @click="props.prevTab()">Powrót</b-button>
                  </div>
                  <div class="wizard-footer-right">
                    <b-button class="button" variant="secondary" v-if="props.activeTabIndex == 0 && !props.isLastStep && !rules_validate" @click="props.nextTab()">Dalej</b-button>
                    <b-button class="button" variant="warning" v-if="props.activeTabIndex == 0 && !props.isLastStep && rules_validate" @click="props.nextTab()">Dalej</b-button>
                    <b-button class="button" variant="secondary" v-if="props.activeTabIndex == 1 && !props.isLastStep && !rank_gender_validate" @click="props.nextTab()">Dalej</b-button>
                    <b-button class="button" variant="warning" v-if="props.activeTabIndex == 1 && !props.isLastStep && rank_gender_validate" @click="props.nextTab()">Dalej</b-button>

                    <b-button class="button" variant="secondary" v-if="props.isLastStep && !rank_province_validate" @click="props.nextTab()">Zakończ</b-button>
                    <b-button class="button" variant="warning" v-if="props.isLastStep && rank_province_validate" @click="props.nextTab()">Zakończ</b-button>
                  </div>
          </template>
        </form-wizard>
              <form-wizard
                v-if="status_rules.status_register==true"
                @on-complete="submit"
                :start-index=index_step
                title=''
                subtitle=''
                nextButtonText="Dalej"
                backButtonText="Wróć"
                finishButtonText="Zakończ"
                errorColor="#ff0018"
                color="#ffc107">
                <tab-content title="Wybór płci"
                             icon="fas fa-venus-mars"
                             :before-change="validateGender">
                  <div id="content">
                    Wybierz swoją płeć, ranga ta będzie widoczna przy twoim nicku na naszym TS3
                  </div>
                  <div id="container">
                    <div id="containers" v-for="(item, index) in rank_gender" v-bind:key="index">
                      <div class="element">
                        <img class="icon" :src="$store.state.path_to_server + 'public/icon/'+item.path">
                      </div>
                      <div class="element">
                        {{ item.rank_name }}
                      </div>
                      <div class="element">
                        <b-form-checkbox
                          :id=item.rankName
                          v-model="selected_gender"
                          :name=item.rankName
                          :value=item.groupId
                          :unchecked-value=null
                        >
                        </b-form-checkbox>
                      </div>
                      <br>
                    </div>
                  </div>
                </tab-content>
                <tab-content title="Wybór województwa"
                             icon="far fa-compass">
                  <div id="container">
                    <div id="containers" v-for="(item, index) in rank_province" v-bind:key="index">
                      <div class="element">
                        <img class="icon" :src="$store.state.path_to_server + 'public/icon/'+item.path">
                      </div>
                      <div class="element2">
                        {{ item.rank_name }}
                      </div>
                      <div class="element">
                        <b-form-checkbox
                          :id=item.rankName
                          v-model="selected_province"
                          :name=item.rankName
                          :value=item.groupId
                          :unchecked-value=null
                        >
                        </b-form-checkbox>
                      </div>
                      <br>
                    </div>
                  </div>
                </tab-content>
                <template slot="footer" slot-scope="props">
                  <div class="wizard-footer-left">
                    <b-button class="button" variant="warning" v-if="!props.activeTabIndex == 0" @click="props.prevTab()">Powrót</b-button>
                  </div>
                  <div class="wizard-footer-right">
                    <b-button class="button" variant="secondary" v-if="props.activeTabIndex == 0 && !props.isLastStep && !rules_validate" @click="props.nextTab()">Dalej</b-button>
                    <b-button class="button" variant="warning" v-if="props.activeTabIndex == 0 && !props.isLastStep && rules_validate" @click="props.nextTab()">Dalej</b-button>
                    <b-button class="button" variant="secondary" v-if="props.activeTabIndex == 1 && !props.isLastStep && !rank_gender_validate" @click="props.nextTab()">Dalej</b-button>
                    <b-button class="button" variant="warning" v-if="props.activeTabIndex == 1 && !props.isLastStep && rank_gender_validate" @click="props.nextTab()">Dalej</b-button>

                    <b-button class="button" variant="secondary" v-if="props.isLastStep && !rank_province_validate" @click="props.nextTab()">Zakończ</b-button>
                    <b-button class="button" variant="warning" v-if="props.isLastStep && rank_province_validate" @click="props.nextTab()">Zakończ</b-button>
                  </div>
                </template>
              </form-wizard>
            </b-jumbotron>
            </b-overlay>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { mapState } from 'vuex'
export default {
  components: {
    FormWizard,
    TabContent
  },
  data () {
    return {
      index_step: 0,
      selected_gender: null,
      selected_province: null,
      alert: false,
      alert2: false,
      status_rules: {
        connect: null,
        time: null,
        ban: null,
        rules: null,
        status_register: null
      },
      payload: {
        gender_id: null,
        province_id: null
      }
    }
  },
  methods: {
    afterSubmit () {
      this.$refs['success-modal'].hide()
      this.$router.push({ path: '/dashboard' })
      window.location.reload()
    },
    submit: function () {
      if (this.selected_province == null) {
        this.alert = true
      } else {
        this.payload.gender_id = this.selected_gender
        this.payload.province_id = this.selected_province
        const headers = {
          'Content-Type': 'application/json'
        }
        axios
          .put(this.$store.state.path_to_server + 'rank-register/register-user-on-ts3', this.payload, { headers })
          .then(response => {
            if (response.status === 200) {
              this.$refs['success-modal'].show()
              setTimeout(this.afterSubmit, 1000)
            }
          })
      }
    },
    validateAsync: function () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .get(this.$store.state.path_to_server + 'rank-register/user-status-rule')
            .then(response => { this.status_rules = response.data })
          if (this.status_rules.connect === false || this.status_rules.time === false || this.status_rules.ban === false || this.status_rules.rules === false) {
            this.alert2 = true
            resolve(false)
          } else {
            resolve(true)
          }
        }, 800)
      })
    },
    validateGender: function () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.selected_gender === null) {
            this.alert = true
            resolve(false)
          } else {
            resolve(true)
          }
        }, 800)
      })
    }
  },
  mounted () {
    this.$store.dispatch('rank_province')
    this.$store.dispatch('rank_gender')
    axios
      .get(this.$store.state.path_to_server + 'rank-register/user-status-rule')
      .then(response => {
        this.status_rules = response.data
      })
  },
  computed: {
    ...mapState([
      'rank_gender',
      'rank_province'
    ]),
    loading () {
      if (this.status_rules.connect == null || this.status_rules.time == null || this.status_rules.ban == null || this.status_rules.rules == null || this.rank_gender == null || this.rank_province == null) {
        return true
      } else return false
    },
    rules_validate () {
      if (this.status_rules.connect === true && this.status_rules.time === true && this.status_rules.ban === true && this.status_rules.rules === true) {
        return true
      } else return false
    },
    rank_gender_validate () {
      if (this.selected_gender != null) {
        return true
      } else return false
    },
    rank_province_validate () {
      if (this.selected_province != null) {
        return true
      } else return false
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
#main {
    background-color:#3b4650;
}
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
    max-width: 470px;
}
.wizard-icon {
    color: black;
}
.stepTitle {
    color: black;
}
.jumbotron {
    background-color: #2e3944;
    color: white;
}
.vue-form-wizard .wizard-icon-circle {
  background-color: #111117 !important;
}
#content {
    text-align: center;
}
#container {
display: block;
}
.element {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'Noto Sans', sans-serif;
      display: inline-block;
  right: 0;
  align-items: center;
}
.element2 {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'Noto Sans', sans-serif;
      display: inline-block;
  right: 0;
  width: 170px;
  align-items: center;
}
#containers {
    justify-content: center;
    display: flex;
  align-items: center;
}
.icon {
    width: 28px;
    height: 32px;
}
#rules {
display: block;
}
#rules_item {
    justify-content: left;
    display: flex;
  align-items: center;
}
.checkbox {
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'Noto Sans', sans-serif;
      display: inline-block;
  right: 0;
  align-items: center;
}
.button {
  width: 100px;
}
</style>
