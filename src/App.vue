<template>
  <div id="public">
    <popup/>
  </div>
      <router-view />
  <Footer/>
</template>

<script>
import MobileNav from './components/MobileNav.vue'
import Footer from './components/Footer.vue'
import popup from './components/popup.vue'
export default {
  name : 'App',
  components : {
    MobileNav, Footer, popup
  }
}
</script>


<style lang="scss">

</style>
