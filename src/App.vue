<template>
  <div id="app">
    <header>
      <Header/>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <Footer />
    </footer>
    <div class="ic-loader" v-if="loaderState">
      <div class="placeholder">
        Now loading...
      </div>
    </div>
    <FlyingNotification />
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FlyingNotification from '@/components/FlyingNotification'
import { mapState } from 'vuex'

export default{
  components: {
    Header,
    Footer,
    FlyingNotification
  },
  computed: mapState({
    loaderState: state => state.loader.show
  }),
  methods: {
    checkAuth: function(){
      if(localStorage.hasOwnProperty('userToken')){
        this.$store.dispatch('auth/tokenExistPreparation');
      }
    }
  },
  beforeMount() {
    this.checkAuth();
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .ic-loader{
    position: absolute;
    top: 0;
    background-color: rgba(255,255,255,.8);
    width: 100%;
    height: 100%;
    display: table;
    z-index: 9999;

    .placeholder{
      margin: auto;
      font-size: 30px;
      display: table-cell;
      vertical-align: middle;
    }
  }
}
</style>
