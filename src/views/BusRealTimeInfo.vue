<template>
  <div class="h-full flex-1 flex-css">
    <header class="p-4 bg-dark-700 relative"  @click.self="hideAllPanel()">
      <!-- back button -->
      <button class="absolute inset-y-0 left-4 focus:outline-none" @click="onBack()">
        <div class="w-12 h-12 flex-ccc">
          <img src="@/assets/kt/back.svg" alt="回上頁按鈕">
        </div>
      </button>
      <div class="w-full flex-rcc">
        <button class="focus:outline-none" @click="onBackHome()">
          <img src="@/assets/kt/Logo-back.svg" alt="回首頁">
        </button>
      </div>
    </header>
    <main class="h-full p-4 bg-dark-800 overflow-auto">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="flex-ccc">
          <div class="text-light-800">{{ routeUID }}</div>
          <div class="text-light-800">{{ routeName }}</div>
        </div>
        <Dropdown class=""
                  classPadding="px-4 py-2 md:py-4"
                  :classBorder="classDDBorder"
                  :classBgTextColor="classDDBgTextColor"
                  :classBgOption="classDDBgOption"
                  v-model.number='selectedSubRouteUID' :types='curSubRouteList'/>
      </div>
      <!-- tabs -->
      <ul class="tabs">
        <li @click="curTab = 'to'"><span class="text-main-500">往</span><span class="ml-1 text-light-800">{{ toStopName }}</span></li>
        <li @click="curTab = 'back'"><span class="text-main-500">往</span><span class="ml-1 text-light-800">{{ fromStopName }}</span></li>
        <div class="indicator">
          <div :class="[(curTab === 'to') ? 'indicator-1' : 'indicator-2']"></div>
        </div>
      </ul>
      <div class="mt-4 text-light-800">{{ curSubRouteList }}</div>
      <div class="mt-4 text-light-800">Coming soon...</div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Dropdown from '@/components/Dropdown.vue';
import { logCatch } from '@/utils/message';

export default {
  name: 'BusRealTimeInfo',
  components: {
    Dropdown,
  },
  data() {
    return {
      city: this.$route.params.city,
      routeUID: this.$route.params.route_uid,
      curTab: 'to',
      selectedSubRouteUID: '',
    };
  },
  created() {
    // search this city route
    if (!this.curRoute) {
      this.setCurrentRoute({ city: this.city, routeUID: this.routeUID }).then(() => {
      }).catch((e) => {
        logCatch('查詢該城市路線發生錯誤', e);
        this.onBack();
      });
    }
  },
  methods: {
    /**
     * router
     */
    onBack() {
      this.$router.back();
    },
    onBackHome() {
      this.$router.push({ name: 'Home' });
    },

    ...mapActions('bus', ['setCurrentRoute']),
  },
  computed: {
    /**
     * dropdown
     */
    classDDBorder() {
      return 'border border-main-500';
    },
    classDDBgTextColor() {
      return 'bg-dark-800 text-main-500 hover:bg-main-500 focus:bg-main-500 ';
    },
    classDDBgOption() {
      return 'bg-dark-800';
    },

    /**
     * ui ddisplay
     */
    routeName() {
      return (this.curRoute && this.curRoute.RouteName) ? this.curRoute.RouteName.Zh_tw : '';
    },
    toStopName() {
      return (this.curRoute) ? this.curRoute.DestinationStopNameZh : '';
    },
    fromStopName() {
      return (this.curRoute) ? this.curRoute.DepartureStopNameZh : '';
    },

    ...mapGetters('bus', ['curRoute', 'curSubRouteList']),
  },
};
</script>

<style lang="scss">
.tabs {
  @apply grid grid-cols-2;
  @apply select-none;
  .indicator {
    @apply col-span-2;
    @apply h-0.5;
    @apply relative;
    .indicator {
      &-1 {
        @apply bg-main-500;
        @apply absolute top-0 bottom-0 left-0 right-1/2;
        @apply duration-300;
      }
      &-2 {
        @apply bg-main-500;
        @apply absolute top-0 bottom-0 left-1/2 right-0;
        @apply duration-300;
      }
    }
  }
}
.tabs li {
  @apply p-3;
  @apply cursor-pointer;
}
</style>
