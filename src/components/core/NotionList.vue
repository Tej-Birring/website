<template>
    <CNotionRichText :data="data.rich_text" elTag="p" class="topLvlClass" />
    <!-- TODO: Children -->
</template>

<script>

import CNotionRichText from "./NotionRichText.vue";
export default {
  name: "NotionList",
  components: {CNotionRichText},
  props: {
    data: Object, // bulleted_list_item
    children: Array,
    numbered: Boolean
  },
  computed: {
    topLvlClass() {
      if (this.numbered) {
        return "numbered"
      } else {
        return "bullet"
      }
    },
    children() {
     // TODO
    }
  }
}
</script>

<style scoped lang="scss">
  .topLvlClass {
    &:before {
      content: "•";
      margin-right: 1rem;
    }
    margin-left: 2.5rem;
  }
</style>
