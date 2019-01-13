<template>
  <div id="app">
    <header>
      <Header/>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
    </footer>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
    <div class="ic-loader" v-if="loaderState">
      <div class="placeholder">
        Now loading...
      </div>
    </div>
  </div>
</template>

<script>

import Header from '@/components/Header'
import { mapState } from 'vuex'

export default{
  components: {
    Header
  },
  computed: mapState({
    loaderState: state => state.loader.show
  })
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
