<script setup>
import { defineProps } from "vue";
const props = defineProps({
  items: {
    type: Array,
    default: []
  }
});

import { inject, ref } from 'vue'
const $utils = inject("$utils");
</script>


<template>
  <div class="icons">
    <a href="#" v-for="(item, idx) in items" :key="idx" class="linkItems" @click.prevent.stop="$utils.openInNewTab(item.href)">
      <ion-icon :name="item.ionicon" class="icon-wrap"/>
    </a>
  </div>
</template>


<style scoped lang="scss">
  ion-icon {
    pointer-events: none;
    font-size: 1.31rem;
  }

  .linkItems {
    &:not(:first-child) {
      margin-left: 0.67rem;
    }
    @include smooth-animation(0.3s);
  }

</style>
