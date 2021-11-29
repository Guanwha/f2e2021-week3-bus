<template>
  <div id="app" class="w-full h-full min-w-80">
    <loading
         :active.sync="isLoading"
         :can-cancel="false"
         :is-full-page="true"
         background-color='#000'
         :opacity='0.7'>
      <template slot="default">
        <div class="w-14 h-14" ref="bodyAnimation"></div>
      </template>
      <template slot="after">
        <div class="text-main-500 mx-auto">{{ loadingMsg }}</div>
      </template>
    </loading>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import lottie from 'lottie-web';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import loadingJson from '@/assets/kt/BUS_loading.json';

export default {
  name: 'App',
  components: {
    Loading,
  },
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.bodyAnimation, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingJson,          // 更正後
    });
  },
  computed: {
    ...mapGetters(['isLoading', 'loadingMsg']),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// overwrite vue-loading-overlay class
.vld-icon {
  @apply flex-ccc;
}
</style>
