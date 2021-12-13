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
                  classPadding="px-4 py-2 md:py-3"
                  :classBorder="classDDBorder"
                  :classBgTextColor="classDDBgTextColor"
                  :classBgOption="classDDBgOption"
                  v-model.number='selectedSubRouteUID' :types='curSubRouteList'/>
      </div>
      <!-- tabs -->
      <ul class="tabs mt-4 -mx-4">
        <li class="tab" @click="curTab = 'to'"><span class="text-main-500">往</span><span class="ml-1 text-light-800">{{ toStopName }}</span></li>
        <li class="tab" @click="curTab = 'back'"><span class="text-main-500">往</span><span class="ml-1 text-light-800">{{ fromStopName }}</span></li>
        <div class="indicator">
          <div :class="[(curTab === 'to') ? 'indicator-1' : 'indicator-2']"></div>
        </div>
      </ul>
      <!-- stop list -->
      <div class="mt-4 text-light-800 text-xs md:text-sm leading-none">
        <template v-if="curRouteStops">
          <div v-if="!curRouteStops[direction]">
            沒有站牌資料
          </div>
          <div v-else v-for="(stop, idx) in curRouteStops[direction].Stops" :key="stopUUID(direction, stop)" class="stop">
            <div class="flex-rlc">
              <div :class="classStopStatus(stop)">{{ stopStatus(stop) }}</div>
              <div class="ml-3">{{ stop.StopName.Zh_tw }}</div>
              <div class="ml-3">{{ stop.stopStatus }}</div>
              <div class="ml-3">{{ stop.estimateTime }}</div>
              <div class="ml-3">{{ stop.plateNumb }}</div>
              <div class="ml-3">{{ stopUUID(direction, stop) }}</div>
            </div>
            <!-- route line -->
            <div class="w-8 h-12 -mr-1 relative">
              <div class="w-1/2 border-r border-main-500" :class="classRouteLine(idx, curRouteStops[direction].Stops.length)"></div>
              <div class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-main-500 rounded-full bg-dark-900" :class="classRouteStop(stop)"></div>
            </div>
          </div>
        </template>
      </div>
      <!-- <div class="mt-4 text-light-800">{{ curRouteStops }}</div>
      <div class="mt-4 text-light-800">Coming soon...</div> -->
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Dropdown from '@/components/Dropdown.vue';
import { logCatch } from '@/utils/message';
import { debounce } from '@/utils/common';

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
      debounceRefreshRouteStops: null,
    };
  },
  watch: {
    selectedSubRouteUID() {
      this.debounceRefreshRouteStops();
    },
  },
  created() {
    // search this city route
    if (!this.curRoute || this.curRoute.RouteUID !== this.routeUID) {
      this.setCurrentRoute({ city: this.city, routeUID: this.routeUID }).then(() => {
        // give selectedSubRouteUID a initial value
        if (this.selectedSubRouteUID === '' && this.curSubRouteList) {
          const uids = Object.keys(this.curSubRouteList);
          this.selectedSubRouteUID = uids[0] || '';
        }
      }).catch((e) => {
        logCatch('查詢該城市路線發生錯誤', e);
        this.onBack();
      });
    }

    // debounce
    this.debounceRefreshRouteStops = debounce(this.refreshRouteStops, 500);
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

    /**
     * control
     */
    refreshRouteStops() {
      const payload = {
        routeUID: this.routeUID,
        subRouteUID: this.selectedSubRouteUID,
      };
      this.getRouteStops(payload).then(() => {}).catch(() => {});
    },

    /**
     * classes
     */
    classStopStatus(stop) {
      if (stop.stopStatus === 0) {
        // 正常
        return (stop.estimateTime < 60) ? 'stop-time-enter' : 'stop-time-normal';
      }
      if (stop.stopStatus === 1 || stop.stopStatus === 3) {
        return 'stop-time-na2';
      }
      return 'stop-time-na';
    },
    classRouteLine(idx, length) {
      if (idx === 0) {
        return 'h-1/2 translate-y-full';
      }
      if (idx === length - 1) {
        return 'h-1/2';
      }
      return 'h-full';
    },
    classRouteStop(stop) {
      if (stop.stopStatus === 0) {
        // 正常
        return (stop.estimateTime < 120) ? 'bg-main-500' : 'bg-dark-900';
      }
      return 'bg-dark-900';
    },

    /**
     * ui display
     */
    stopUUID(direction, stop) {
      let uuid = `${this.curRouteStops[direction].RouteUID}-${this.curRouteStops[direction].SubRouteUID}-${stop.StopUID}`;
      uuid += `-${stop.estimateTime}`;
      return uuid;
    },
    stopStatus(stop) {
      if (stop.stopStatus === 0) {
        // 正常
        return (stop.estimateTime < 60) ? '進站中' : `${parseInt(stop.estimateTime / 60, 10)}分`;
      }
      if (stop.stopStatus === 1) {
        return '尚未發車';
      }
      if (stop.stopStatus === 2) {
        return '交管不停靠';
      }
      if (stop.stopStatus === 3) {
        return '末班車已過';
      }
      if (stop.stopStatus === 4) {
        return '今日未營運';
      }
      return '無資訊';
    },

    ...mapActions('bus', ['setCurrentRoute', 'getRouteStops']),
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
    direction() {
      return (this.curTab === 'back') ? 1 : 0;
    },

    ...mapGetters('bus', ['curRoute', 'curSubRouteList', 'curRouteStops']),
  },
};
</script>

<style lang="scss">
.tabs {
  @apply grid grid-cols-2;
  @apply select-none;
  .tab {
    &:hover {
      @apply bg-dark-500;
    }
  }
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

.stop {
  @apply flex-rsbc;
  &:hover {
    @apply bg-dark-500;
  }
}
// 無資訊、交管不停靠、今日未營運 (無車，較不重要的資訊)
.stop-time-na {
  @apply bg-dark-800;
  @apply text-dark-400;
  @apply rounded-xl;
  @apply w-20 h-10;
  @apply flex-ccc;
}
// 尚未發車、末班車已過 (無車，較重要的資訊)
.stop-time-na2 {
  @apply bg-dark-500;
  @apply text-light-800;
  @apply rounded-xl;
  @apply w-20 h-10;
  @apply flex-ccc;
}
// 進站中
.stop-time-enter {
  @apply bg-main-500;
  @apply text-dark-800;
  @apply border;
  @apply border-main-500;
  @apply rounded-xl;
  box-shadow: 0 0 6px $main-500;
  @apply w-20 h-10;
  @apply flex-ccc;
}
// 正常倒數狀態
.stop-time-normal {
  @apply bg-dark-800;
  @apply text-main-500;
  @apply border;
  @apply border-main-500;
  @apply rounded-xl;
  box-shadow: 0 0 6px $main-500;
  @apply w-20 h-10;
  @apply flex-ccc;
}
</style>
