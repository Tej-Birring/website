<template>
<!--  <div>-->
    <CNotionRichText :data="data.heading_1.rich_text" v-if="data.type==='heading_1'" elTag="h1" :class="`${classes} mb-2 notion-block`" />
    <CNotionRichText :data="data.heading_2.rich_text" v-else-if="data.type==='heading_2'" elTag="h2" :class="`${classes} mb-2 notion-block`" />
    <CNotionRichText :data="data.heading_3.rich_text" v-else-if="data.type==='heading_3'" elTag="h3" :class="`${classes} mb-2 notion-block`" />
    <CNotionRichText :data="data.paragraph.rich_text" v-else-if="data.type==='paragraph'" elTag="p" :class="`${classes} mb-8 notion-block`" />
    <CNotionRichText :data="data.quote.rich_text" v-else-if="data.type==='quote'" elTag="blockquote" :class="`${classes} my-8 notion-block`" />
    <hr v-else-if="data.type==='divider'" :class="classes" />
    <CNotionImage v-else-if="data.type==='image'" :class="`${classes} notion-block`" :data="data" />
<!--  </div>-->
</template>

<script setup>
  import { defineProps, ref, computed } from "vue";
  import CNotionRichText from "./NotionRichText.vue";
  import CNotionImage from "./NotionImage.vue";

  const props = defineProps({
    data: Object,
    class: String
  });

  const classes = ref(props.class);
</script>

<style scoped lang="scss">
.notion-block {
  @include select-drag();
}

p.notion-block {
  font-size: 1.13rem;
}
</style>
