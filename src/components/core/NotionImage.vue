<template>
  <div>
    <img :src="imgSrc" :class="`${classes}`"/>
    <CNotionRichText :data="caption" elTag="p" :class="`${classes} mt-2 mb-8 text-size-sm text-center`" v-if="caption" />
  </div>
</template>

<script>
import CNotionRichText from "./NotionRichText.vue";
import {inject, ref} from "vue";

export default {
  name: "NotionImage",
  components: {CNotionRichText},
  props: {
    class: String,
    data: Object
  },
  setup(props) {
    const utils = inject("$utils");
    const imgUrl = props?.data?.image?.external?.url;
    const imgSrc = ref(null);
    utils.fetchImage(imgUrl).then((img)=>{
      imgSrc.value = img;
    }).catch((err)=>{console.log(err)})
    return {
      imgUrl,
      imgSrc
    }
  },
  computed: {
    caption() {
      return this.data?.image?.caption;
    },
    classes() {
      return this.class;
    }
  }
}
</script>

<style scoped>
.notion-block {
  @include select-drag();
}

</style>
