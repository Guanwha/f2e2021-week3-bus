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
      <div class="text-light-800">{{ routeUID }}</div>
      <div class="mt-4 text-light-800">Coming soon...</div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'BusRealTimeInfo',
  data() {
    return {
      routeUID: this.$route.params.route_uid,
    };
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
  },
};
</script>

<style>

</style>
