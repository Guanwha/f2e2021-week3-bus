<template>
  <div class="w-full h-full bg-gradient-to-b from-dark-600 to-dark-900">
    <!-- bubbles -->
    <div class="absolute inset-0">
      <div class="z-10 absolute -top-10 right-5p w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-light-500 duration-1000"></div>
      <div class="z-10 absolute bottom-50p -left-8 w-20 h-20 rounded-full border border-light-500"></div>
      <div class="z-10 absolute bottom-30p -left-10 w-12 h-12 rounded-full border border-light-500"></div>
      <div class="z-10 absolute -top-10 left-30p w-16 h-16 rounded-full border border-light-500 opacity-0 lg:opacity-100 duration-1000"></div>
      <div class="z-10 absolute top-30p left-20p w-16 h-16 rounded-full border border-light-500 opacity-0 lg:opacity-100 duration-1000"></div>
      <div class="z-10 absolute top-60p left-30p w-16 h-16 rounded-full border border-light-500 opacity-0 md:opacity-100 duration-1000"></div>
      <div class="z-10 absolute top-20p left-50p w-20 h-20 rounded-full border border-light-500 opacity-0 md:opacity-100 duration-1000"></div>
      <div class="z-10 absolute w-1 h-1 rounded-full bg-yellow-100 meteor-anim"></div>
    </div>
    <!-- logl -->
    <img class="absolute w-36 h-16 origin-top-left top-6 left-5 lg:top-16 lg:left-12 lg:left-16 lg:scale-150 transition-all" src="@/assets/kt/Logo-home.svg" alt="Logo">
    <!-- home buttons -->
    <!-- <div class="absolute" style="bottom: 24rem; right: 12rem"> -->
    <!-- <div class="absolute" style="bottom: 32rem; right: 18rem"> -->
    <!-- <div class="absolute" style="bottom: 40rem; right: 32rem"> -->
    <div class="z-20 absolute bottom-96 right-48 sm:bottom-128 sm:right-72 lg:bottom-160 lg:right-128">
      <div class="absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 btn-halo-near-bus"
           @mouseover="mouseOverLongBus" @mouseleave="mouseLeaveLongBus">
        <div class="z-30 absolute-center flex-ccc gap-2">
          <img src="@/assets/kt/GPS.svg" alt="附近公車站">
          <div class="text-base sm:text-lg lg:text-xl text-light-800">{{ (hoverLongBus) ? 'Coming soon...' : '附近公車站' }}</div>
        </div>
      </div>
      <!-- <div class="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 btn-halo-search-bus" style="top: 9rem; left: 4rem"> -->
      <!-- <div class="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 btn-halo-search-bus" style="top: 12rem; left: 6rem"> -->
      <!-- <div class="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-64 lg:h-64 btn-halo-search-bus" style="top: 16rem; left: 8rem"> -->
      <div class="absolute w-40 h-40 top-36 left-16 sm:w-52 sm:h-52 sm:top-48 sm:left-24 lg:w-64 lg:h-64 lg:top-64 lg:left-32 btn-halo-search-bus"
           @click="gotoSearchBus">
        <div class="z-30 absolute-center flex-ccc gap-2">
          <img class="fill-current text-dark-800" src="@/assets/kt/search.svg" alt="查詢公車">
          <div class="text-base sm:text-lg lg:text-xl text-dark-800">查詢公車</div>
        </div>
      </div>
    </div>
    <!-- <div class="absolute w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 btn-halo-long-bus" style="bottom: -1.5rem; left: -3rem;"> -->
    <!-- <div class="absolute w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 btn-halo-long-bus" style="bottom: -1.5rem; left: -3rem;"> -->
    <!-- <div class="absolute w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 btn-halo-long-bus" style="bottom: -3rem; left: auto; right: 40%"> -->
    <div class="z-20 absolute w-40 h-40 -bottom-6 -left-12 lg:-bottom-12 lg:left-auto lg:right-40p sm:w-56 sm:h-56 lg:w-72 lg:h-72 btn-halo-long-bus"
         @mouseover="mouseOverLongBus" @mouseleave="mouseLeaveLongBus">
        <div class="z-30 absolute-center flex-ccc gap-2">
          <img class="fill-current text-dark-800" src="@/assets/kt/search.svg" alt="查詢客運">
          <div class="text-base sm:text-lg lg:text-xl text-dark-800">{{ (hoverLongBus) ? 'Coming soon...' : '查詢客運' }}</div>
        </div>
    </div>
    <!-- copyright -->
    <div class="absolute bottom-5 left-auto right-10 lg:left-10 lg:right-auto max-w-max text-sm text-light-800">
      <div class="flex-ccl sm:flex-rcc">
        <span>Taiwan Bus © </span>
        <span>Code: Crane  /  Design: KT</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      hoverLongBus: false,
    };
  },
  methods: {
    /**
     * router
     */
    gotoSearchBus() {
      this.$router.push({ name: 'SearchBus' });
    },

    /**
     * control
     */
    mouseOverLongBus() {
      this.hoverLongBus = true;
    },
    mouseLeaveLongBus() {
      this.hoverLongBus = false;
    },
  },
};
</script>

<style lang="scss">

@mixin btn-halo($light-clr, $dark-clr, $bg-image) {
  transition-duration: 1s;
  position: relative;
  @apply select-none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scale(1.08);
    border: 1px solid $light-clr;
    opacity: 33%;
    border-radius: 50%;
    
    // shadow effect
    filter: drop-shadow(0px 0px 10px $light-clr) drop-shadow(0px 0px 10px $light-clr);
  }
  &::after {
    // layout
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scale(0.8);
    
    // button double-circle
    border: 4px double transparent;
    border-radius: 50%;
    background-image: $bg-image;
    background-origin: border-box;
    background-clip: content-box, border-box;
    
    // shadow effect
    filter: drop-shadow(0px 0px 10px $light-clr);
    box-shadow: 0px 0px 32px $light-clr, 1px 13px 10px #000000;
    
    // animation
    transition-duration: 0.2s;
  }
  &:hover::after {
    transform: scale(0.9);
    filter: drop-shadow(0px 0px 30px $light-clr);
  }
}

.btn-halo-near-bus {
  @include btn-halo($main-500, $main-500,
                    (linear-gradient(149.2deg, $main-500 29.55%, $main-600 78.54%), linear-gradient(323.99deg, $main-500 65.35%, #FFFFFF 89.01%)));
}

.btn-halo-long-bus {
  @include btn-halo($second-500, $second-500,
                    (linear-gradient(149.2deg, $second-500 29.55%, $second-600 78.54%), linear-gradient(323.99deg, $second-500 65.35%, #FFFFFF 89.01%)));
}
.btn-halo-search-bus {
  @apply cursor-pointer;
  @include btn-halo(#FFF, #FFF,
                    (linear-gradient(149.2deg, #FFF 29.55%, #BBB 78.54%), linear-gradient(323.99deg, #FFF 65.35%, #FFFFFF 89.01%)));
}

// meteor animation
.meteor-anim {
  animation-name: anim-meteor;
  animation-duration: 7s;
  animation-iteration-count: infinite;
}
@keyframes anim-meteor {
  0%   {left: -30%; bottom: 30%}
  100% {left: 130%; bottom: 90%}
}

</style>
