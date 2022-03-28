<script setup>
import { defineProps, watch, ref } from "vue";
const props = defineProps({
  base64ImgData: String
});

const elBackgroundImage = ref(null);

watch(props, async(newVal, oldVal)=>{
  if (!elBackgroundImage.value) return;
    elBackgroundImage.value.style.backgroundImage = `url(${newVal.base64ImgData})`;
})
</script>




<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 page-background -z-5" ref="elBackgroundImage" v-show="base64ImgData"/>
</template>




<style scoped>
@keyframes animatedBackground {
  from {
    opacity: 0;
    background-position: 0 0;
  }
  to {
    opacity: 0.05;
    background-position: center;
  }
}

.page-background {
  opacity: 0.05;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /*animation: animatedBackground 1s ease-in;*/
  /*animation-fill-mode: both;*/
}
</style>
