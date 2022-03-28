<template>
  <div class="overlay" ref="overlay" />
</template>


<script>
export default {
  name: "_overlay",
  methods: {
    show() {
      this.$refs.overlay.classList.add("is-active");
    },
    hide() {
      this.$refs.overlay.classList.remove("is-active");
    }
  }
}
</script>


<style scoped lang="scss">
.overlay {
  display: none;
  height: 100vh;
  width: 100vw;
  background-color: $clrJet;
  opacity: 90%;
  position: absolute;
  z-index: 999;
  &.is-active {
    display: block;
  }
}
</style>
