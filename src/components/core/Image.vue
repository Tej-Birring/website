<template>
    <img :src="imgSrc" class="img-block" :class="class" :alt="alt" v-if="imgSrc" />
</template>

<script>
import {inject, ref} from "vue";

export default {
  name: "Image",
  props: {
    class: String,
    data: String,
    alt: String
  },
  setup(props, { emit }) {
    const utils = inject("$utils");
    const imgUrl = props?.data;
    const imgSrc = ref(null);
    if (!imgUrl) return;
    utils.fetchImage(imgUrl).then((img)=>{
      imgSrc.value = img;
      emit("img-ready");
    }).catch((err)=>{console.log(err)})
    return {
      imgUrl,
      imgSrc
    }
  },
  emits: ["img-ready"]
}
</script>

<style scoped>
.img-block {
  width: 100%;
  @include select-drag();
}
</style>
