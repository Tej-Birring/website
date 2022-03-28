<script setup>
  import { inject, ref } from 'vue'

  const $utils = inject("$utils");
  const $notion = inject("$notion");

  const img = ref(null);
  const content = ref(null);
  const personalInfo = ref(null);
  const actionButtons = ref(null);

  $notion.getPage("75774a3360cf4415a04e3f6db6df77ad")
      .then((res)=>{
        content.value={
          properties: res?.properties,
          blocks: res?.blocks
        };
        if (res?.properties?.MainImage) {
          return $utils.fetchImage(res?.properties?.MainImage?.files[0]?.file?.url);
        }
      })
      .then((imgStr)=>{
        img.value = imgStr;
      });

  $notion.getDatabase("33ede2c3f1194a6fb0cdf5fc8ee3c24a", [{property: "Position", direction: "ascending"}])
      .then((res)=>{
        personalInfo.value = res?.results.map((page)=>{
          return {
            title: page.properties?.Name?.title[0]?.plain_text,
            ionicon: page.properties?.Icon?.rich_text[0]?.plain_text,
            value: page.properties?.Value?.rich_text[0]?.plain_text
          }
        });
      });

  $notion.getDatabase("a1a9bfb59f754c2ca5c1651b4e2dd6e5",
      [{property: "Position", direction: "ascending"}],
      {
        property: "Tags",
        multi_select: {
          contains: "AboutPage"
        }
      })
      .then((res)=>{
        actionButtons.value = res?.results.map((page)=>{
          return {
            title: page.properties?.Name?.title[0]?.plain_text,
            ionicon: page.properties?.Icon?.rich_text[0]?.plain_text,
            href: page.properties?.Link?.url//rich_text[0]?.plain_text
          }
        });
      });

</script>


<template>
  <c-background-image :base64ImgData="img" />
<!--  <div class="mainImageWrap">-->
<!--    <img :src="img" alt="Picture." class="pb-10 fade-in w-full" v-if="img" />-->
<!--  </div>-->


    <div class="grid grid-cols-3 gap-6 overflow-hidden">

      <div class="col-span-3 xl:col-span-2 xl:row-span-full">
        <c-notion-block v-for="(item, idx) in content?.blocks" :key="idx" :data="item" class="<lg:text-center" v-animate:fadeInBottom.long.inView="{delay:idx*50}" />
      </div>

      <div class="row-span-1 col-span-3 xl:col-span-1 -order-1" v-animate:fadeInTop.long="{delay:1500}">
        <c-details :details="personalInfo" class="text-center flex flex-row flex-wrap xl:flex-col justify-start xl:text-right xl:max-w-120 xl:ml-auto mb-4" />
        <div class="flex flex-row <md:flex-col xl:flex-col flex-wrap justify-evenly items-bottom">
          <button v-for="(btn, idx) in actionButtons" :key="`btn-${idx}`" class="mb-4 xl:max-w-120 xl:ml-auto xl:w-full" @click.prevent.stop="$utils.openInNewTab(btn.href)">
            <ion-icon :name="btn.ionicon" class="mr-2 text-lg" v-if="btn.ionicon"/>
            {{btn.title}}
          </button>
        </div>
      </div>

    </div>


</template>




<style scoped lang="scss">

</style>
