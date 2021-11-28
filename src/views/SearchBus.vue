<template>
  <div class="h-full flex-1 flex-css">
    <header class="p-4 bg-dark-700 flex-rsbc gap-4"  @click.self="hideAllPanel()">
      <!-- back button -->
      <button class="focus:outline-none" @click="onBack()">
        <img src="@/assets/kt/Logo-back.svg" alt="回首頁按鈕">
      </button>
      <div class="flex-rcc">
        <!-- city button -->
        <button type="button" class="btn-city focus:outline-none" @click="openCityPanel()" v-if="!selectedCity">請先選擇縣市</button>
        <!-- search field -->
        <input v-if="selectedCity" ref="search"
               type="search" class="ml-2 px-4 py-2 bg-dark-600 text-light-800 placeholder-dark-400 focus:outline-none" placeholder="選擇路線名稱"
               @click="openBusPanel()"
               v-model="search">
      </div>
    </header>
    <main class="h-full p-4 bg-dark-800 overflow-auto">
      <audio ref="audio" class="hidden" controls src='@/assets/kt/Bus.mp3'></audio>
      <div class="w-full h-full lg:container mx-auto focus:outline-none">
        <!-- content -->
        <content class="w-full h-full block" @click.self="hideAllPanel()">
          <div class="text-right text-light-800" v-if="selectedCity">{{ selectedCity }}</div>
        </content>
        <!-- city keyboard -->
        <div ref="panel-city" class="panel panel-display" disabled>
          <button v-for="(city, key) in cities" :key="key"
                  type="button" class="col-span-1 btn-keyborad" @click="clickCityKey(key)" tabindex="-1">{{ city.name }}</button>
        </div>
        <!-- bus keyboard -->
        <div ref="panel-bus" class="panel panel-display" disabled>
          <button type="button" class="col-span-3 btn-keyborad flex-rcc gap-2 text-light-800" @click="openCityPanel()" tabindex="-1">
            <div class="fill-current">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 19.9444C12 19.9444 18.5 15.6111 18.5 10.5555C18.5 8.83164 17.8152 7.17834 16.5962 5.95935C15.3772 4.74036 13.7239 4.05554 12 4.05554C10.2761 4.05554 8.62279 4.74036 7.40381 5.95935C6.18482 7.17834 5.5 8.83164 5.5 10.5555C5.5 15.6111 12 19.9444 12 19.9444ZM14.1674 10.5557C14.1674 11.7523 13.1973 12.7224 12.0007 12.7224C10.8041 12.7224 9.83405 11.7523 9.83405 10.5557C9.83405 9.35908 10.8041 8.38903 12.0007 8.38903C13.1973 8.38903 14.1674 9.35908 14.1674 10.5557Z" fill="currentColor"/>
              </svg>
            </div>
            <div>{{ selectedCity || '選擇縣市' }}</div>
          </button>
          <button type="button" class="col-span-2 btn-keyborad" @click="focusSearchInput()" tabindex="-1">手動輸入</button>
          <button type="button" class="col-span-1 btn-keyborad text-red-300" @click="clickBusKey('紅', true)" tabindex="-1">紅</button>
          <button type="button" class="col-span-1 btn-keyborad text-blue-300" @click="clickBusKey('藍', true)" tabindex="-1">藍</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('1')" tabindex="-1">1</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('2')" tabindex="-1">2</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('3')" tabindex="-1">3</button>
          <button type="button" class="col-span-1 btn-keyborad text-green-300" @click="clickBusKey('綠', true)" tabindex="-1">綠</button>
          <button type="button" class="col-span-1 btn-keyborad text-yellow-700" @click="clickBusKey('棕', true)" tabindex="-1">棕</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('4')" tabindex="-1">4</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('5')" tabindex="-1">5</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('6')" tabindex="-1">6</button>
          <button type="button" class="col-span-1 btn-keyborad text-yellow-500" @click="clickBusKey('橘', true)" tabindex="-1">橘</button>
          <button type="button" class="col-span-1 btn-keyborad" @click="clickBusKey('小', true)" tabindex="-1">小</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('7')" tabindex="-1">7</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('8')" tabindex="-1">8</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('9')" tabindex="-1">9</button>
          <button type="button" class="col-span-1 btn-keyborad" @click="clickBusKey('幹線', true)" tabindex="-1">幹線</button>
          <button type="button" class="col-span-1 btn-keyborad" @click="openMoreBusPanel()" tabindex="-1">更多</button>
          <button type="button" class="col-span-1 btn-keyborad" @click="clearSearch()" tabindex="-1">C</button>
          <button type="button" class="col-span-1 btn-keyborad text-light-800" @click="clickBusKey('0')" tabindex="-1">0</button>
          <button type="button" class="col-span-1 btn-keyborad flex-rcc text-main-500 fill-current" @click="backSearch()" tabindex="-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1393 3.50558L5.28672 9.7712C3.57109 10.7618 3.57109 13.2382 5.28672 14.2288L16.1393 20.4944C17.8549 21.485 20 20.2474 20 18.2662V5.73382C20 3.75265 17.8549 2.515 16.1393 3.50558ZM16.4083 13.4126C16.5988 13.5834 16.7177 13.7728 16.7523 13.9587C16.7881 14.163 16.7165 14.3443 16.5318 14.5163C16.3667 14.6583 16.2016 14.7183 16.0042 14.7045C15.8021 14.6929 15.5828 14.5659 15.3322 14.3166L13.9988 12.9923L12.5776 14.4066C12.3963 14.5983 12.222 14.7045 12.0326 14.738C11.9968 14.7437 11.9622 14.7472 11.9287 14.7472C11.7601 14.7472 11.6101 14.6699 11.4727 14.5128C11.3353 14.3524 11.2764 14.1861 11.2879 13.9887C11.2995 13.7809 11.4346 13.5557 11.6897 13.3214L13.0082 12.011L11.6493 10.6613C11.4542 10.4766 11.3318 10.278 11.2995 10.0898C11.2729 9.86587 11.3341 9.69384 11.49 9.53798C11.632 9.39598 11.7786 9.32786 11.9403 9.32786C12.1319 9.32786 12.3178 9.40406 12.5268 9.56915L12.5418 9.58185L13.9988 11.0227L15.4304 9.60725C15.6301 9.40752 15.8287 9.28976 16.0203 9.25743C16.227 9.23088 16.4025 9.29669 16.5618 9.45601C16.6992 9.58185 16.7719 9.7331 16.7719 9.89819C16.7604 10.1176 16.683 10.3023 16.5272 10.4882L16.5156 10.5009L14.9894 12.0017L16.4083 13.4126Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Cities } from '@/utils/enums';

export default {
  name: 'SearchBus',
  data() {
    return {
      cities: Cities,
      selectedCityID: '',
      search: '',
    };
  },
  methods: {
    /**
     * router
     */
    onBack() {
      this.$router.back();
    },

    /**
     * control
     */
    hideAllPanel() {
      this.$refs['panel-city'].setAttribute('disabled', '');
      this.$refs['panel-bus'].setAttribute('disabled', '');
    },
    openCityPanel() {
      this.playKeySound();
      this.$refs['panel-bus'].setAttribute('disabled', '');
      this.$refs['panel-city'].removeAttribute('disabled', '');
    },
    openBusPanel() {
      this.$refs['panel-city'].setAttribute('disabled', '');
      this.$refs['panel-bus'].removeAttribute('disabled', '');
    },
    openMoreBusPanel() {},

    playKeySound() {
      this.$refs.audio.volume = 0.2;
      this.$refs.audio.play();
    },
    clickCityKey(key) {
      this.playKeySound();
      this.selectedCityID = key;
      this.$refs['panel-city'].setAttribute('disabled', '');
      this.$refs['panel-bus'].removeAttribute('disabled', '');  // change to show bus panel
    },
    clickBusKey(word, isCover = false) {
      this.playKeySound();
      if (isCover) {
        this.search = word;
      }
      else {
        this.search += word;
      }
    },
    clearSearch() { this.playKeySound(); this.search = ''; },
    backSearch() { this.playKeySound(); this.search = this.search.slice(0, -1); },
    focusSearchInput() { this.playKeySound(); this.$refs.search.focus(); },
  },
  computed: {
    selectedCity() {
      return (this.cities[this.selectedCityID] && this.cities[this.selectedCityID].name);
    },
  },
};
</script>

<style lang="scss">
.btn-city {
  @apply p-2;
  @apply text-main-500;
  @apply duration-200;
  &:hover {
    @apply bg-main-500;
    @apply text-dark-800;
  }
}
.btn-keyborad {
  @apply border;
  @apply border-main-500;
  @apply rounded-lg;
  box-shadow: 0 0 6px $main-500;
  @apply px-1 py-3;
  &:hover {
    @apply bg-main-500;
    @apply text-dark-800;
  }
}
.panel {
  @apply lg:max-w-sm;
  @apply grid grid-cols-5 gap-3;
  @apply rounded;
  @apply p-4;
  @apply bg-dark-700;
  @apply text-main-500;
  @apply text-xs sm:text-base;
}
.panel-display {
  @apply absolute bottom-0 inset-x-0;
  @apply transform translate-y-0;
  @apply duration-1000;

  &[disabled] {
    @apply transform translate-y-full;
  }
}
</style>
