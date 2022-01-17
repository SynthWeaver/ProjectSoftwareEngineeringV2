<template>
  <div id="app">
    <TopBar />
    <!-- <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'about' }">About</router-link>
    <router-link :to="{ name: 'transaction', params: { slug: 'any-string' } }"
      >transaction</router-link
    > -->

    <transition-group name="fade">
      <toast-message
        v-if="isVisible"
        :key="3"
        class="toast"
        toastMessage="Uw winkelwagen is geupdate"
        title="Succesvol!"
      />
    </transition-group>
    <router-view></router-view>
  </div>
</template>

 
<script >
import TopBar from "./components/TopBar";
import ToastMessage from "./components/ToastMessage";
export default {
  components: {
    TopBar,
    ToastMessage, // register component
  },
  watch: {
    "$store.state.itemsInCart": function () {
      this.$store.dispatch("filterCart");
    },
    "$store.state.filteredCart": function () {
      this.displayUpdatedCartMessage();
    },
  },
  data() {
    return {
      toastIsVisible: false,
    };
  },
  computed: {
    isVisible() {
      return this.toastIsVisible;
    },
  },
  methods: {
    displayUpdatedCartMessage() {
      this.toastIsVisible = true;
      setTimeout(() => (this.toastIsVisible = false), 3000);
    },
  },
};
</script>
<style scoped>
.fade-leave-active {
  transition: 0.8s;
}
.fade-enter-active {
  transition: 1s;
}
.fade-leave-to,
.fade-enter {
  opacity: 0;
}
.toast {
  position: absolute;

  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, 0%);
}
</style>