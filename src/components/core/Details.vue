<script setup>
  import {defineProps} from "vue";
  const props = defineProps({
    details: Object,
    class: String
  });
</script>


<template>
  <div class="top" :class="class">
      <div v-for="(item, idx) in details" :key="idx" class="item my-3 mx-3 flex-grow">
        <div class="title">
          <ion-icon :name="item.ionicon" v-if="item?.ionicon"/>
          {{item.title}}
        </div>
        <div class="value">{{item.value}}</div>
      </div>
    </div>
</template>


<style scoped lang="scss">
  .top{
    background-color: color.adjust($clrGoldFusion, $alpha: -0.45);
    @include box-shadow;
    overflow: hidden;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .item {
    display: block;
    .title {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      text-align: right;
      background-color: $clrGray;
      color: $clrJet;
      padding: 0.31rem 1rem;
      margin-bottom: 0.55rem;
    }
    .value {
      display: block;
      color: $clrGray;
      padding-top: 0.21rem;
      //white-space: nowrap;
      //width: 100%;
    }
  }



</style>
