<template>
  <div class="notification-wrapper">
  <div class="notification" ref="notification">
    <div class="content flex flex-row justify-center items-center">
      <slot />
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "notification",
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    show(durationInSeconds) {
      if (this.isShowing) return;
      this.isShowing = true;
      const n = this.$refs.notification;
      n.animate([
        { // from
          opacity: 0,
          transform: "translateY(+100px)"
        },
        { // to
          opacity: 1,
          transform: "translateY(0)"
        }
      ], {
        duration: 610,
        easing: "ease-in-out",
        fill: "forwards"
      });
      setTimeout(()=>{
        n.animate([
          { // from
            opacity: 0,
            transform: "translateY(+100px)"
          },
          { // to
            opacity: 1,
            transform: "translateY(0)"
          }
        ], {
          duration: 610,
          easing: "ease-in-out",
          direction: "reverse",
          fill: "forwards"
        });
        this.isShowing = false;
      }, durationInSeconds*1000);
    }
  }
}
</script>

<style scoped lang="scss">
  $bgClr: #039be5;

  .notification-wrapper {
    z-index: 1000;
    position: absolute;
    height: 20vh;
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .notification {
    position: fixed;
    display: block;
    margin-left: auto;
    margin-right: auto;
    left: 22.5vw;
    right: 22.5vw;
    bottom: 3vh;
    height: 7vh;
    background-color: $bgClr;
    opacity: 0;
    @include box-shadow();

    .content {
      color: darken($bgClr, 34%);
      height: 100%;
    }

  }
</style>
