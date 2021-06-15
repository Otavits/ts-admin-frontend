<template>
    <sidebar-menu :menu="menu"/>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import '@fortawesome/fontawesome-free/css/all.css'
export default {
  components: {
    SidebarMenu
  },
  props: {
    relative: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menu: [
        {
          header: true,
          title: 'Menu Główne',
          hiddenOnCollapse: true
        },
        {
          href: '/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-tachometer-alt'
        },
        {
          header: true,
          title: 'Twoje konto',
          hiddenOnCollapse: true
        },
        {
          href: '/register/rank',
          title: 'Rejestracja',
          icon: 'fas fa-venus-mars'
        },
        {
          href: '/',
          title: 'Rangi',
          icon: 'fas fa-user-tag'
        },
        {
          href: '/',
          title: 'Kanał prywatny',
          icon: 'fas fa-user-lock'
        },
        {
          href: '/',
          title: 'Moje kary',
          icon: 'fas fa-exclamation'
        },
        {
          header: true,
          title: 'Serwer',
          hiddenOnCollapse: true
        },
        {
          href: '/charts',
          title: 'Charts',
          icon: 'fa fa-chart-area',
          child: [
            {
              href: '/charts/sublink',
              title: 'Sub Link'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">

$primary-color: #ffc107 !default;
$base-bg: #1e1e21 !default;

$item-color: #fff !default;

$item-active-color: null !default;
$item-active-bg: null !default;

$item-open-color: #fff !default;
$item-open-bg: $primary-color !default;

$item-hover-color: null !default;
$item-hover-bg: rgba(darken($base-bg, 5%), 0.5) !default;

$icon-color: null !default;
$icon-bg: darken( $base-bg, 5% ) !default;

$icon-active-color: null !default;
$icon-active-bg: null !default;

$icon-open-color: null !default;
$icon-open-bg: $item-open-bg !default;

$mobile-item-color: #fff !default;
$mobile-item-bg: $primary-color !default;
$mobile-icon-color: $mobile-item-color !default;
$mobile-icon-bg: $mobile-item-bg !default;

$dropdown-bg: lighten( $base-bg, 5% ) !default;
$dropdown-color: null !default;

$item-font-size: 16px !default;
$item-line-height: 30px !default;
$item-padding: 10px !default;
$icon-height: 30px !default;
$icon-width: 30px !default;
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";

.v-sidebar-menu  {
    height: 100vh;
    bottom: 0px;
    .vsm--link {
        color: white;
}
}

</style>
