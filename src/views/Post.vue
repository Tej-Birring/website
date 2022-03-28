<template>
  <div class="flex flex-col justify-start items-stretch md:flex-row md:justify-between md:items-start">
    <button @click.prevent.stop="()=>{$router.push('/posts')}">
      <ion-icon name="caret-back" class="mr-2 text-lg" />
      Back to posts
    </button>
    <button class="mt-6 md:mt-0" @click.prevent.stop="copyUrlToClipboard">
      <ion-icon name="share-social" class="mr-2 text-lg" />
      Share
    </button>
    <v-notification ref="copyNotif">
      <ion-icon name="clipboard" class="mr-2 text-lg" />
      Link copied to clipboard.
    </v-notification>
  </div>
  <h2 class="flex flex-col justify-center items-center mb-13 text-center mt-13" v-animate:fadeInTop.long>
    <ion-icon :name="post.ionicon" v-if="post?.ionicon" class="flex-shrink-0" style="font-size: 8rem"/>
    <span class="max-w-150">{{ post?.title }}</span>
  </h2>
  <p class="date mb-21 flex flex-row justify-center items-center" v-if="post?.published" v-animate:fadeIn>
    <ion-icon name="calendar" class="mr-2" />
    <span class="italic">{{$utils.dateObjToDateString(post.published.day)}}</span>
  </p>

  <div class="post-content">
    <c-notion-block v-for="(item, idx) in post?.blocks" :key="idx" :data="item" class="<lg:text-center" v-animate:fadeInBottom.long.inView="{delay:idx*50}" />
  </div>
</template>

<script setup>
import {inject, onBeforeMount, ref} from "vue";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();
const id = route.params?.id;

const $utils = inject("$utils");
const $notion = inject("$notion");

const post = ref(undefined);

$utils.loading.value = true;
$notion.getPage(id)
    .then((res)=>{
      post.value = {
        created: res.properties?.["Created"]?.created_time,
        lastEdited: res.properties?.["Last Edited"]?.last_edited_time,
        published: res.properties?.["Published"]?.date?.start,
        title: res.properties?.["Name"]?.title[0]?.plain_text,
        ionicon: res.properties?.Icon?.rich_text[0]?.plain_text,
        tags: res.properties?.Tags?.multi_select,
        topic: res.properties?.Topic?.select,
        featureImg: res.properties?.["Feature Image"]?.files?.[0]?.file?.url,
        short: res.properties?.["Short Description"]?.rich_text,
        blocks: res.blocks
      }
      $utils.loading.value = false;
    }).catch(()=>{
      $utils.loading.value = false;
      console.error("Error fetching post: " + id);
      router.push("/posts");
    });

  const copyNotif = ref(null);
  function copyUrlToClipboard() {
    const url = `${window.location.origin}${route.fullPath}`;
    $utils.copyTextToClipboard(url);
    copyNotif.value?.show(3.4);
  }
</script>




<style scoped lang="scss">
  .date {
    font-size: 1.21rem;
    font-weight: 800;
  }

  .post-content {
    display: block;
    margin: 0 auto;
    @screen lg {
      max-width: 55vw;
    }
  }
</style>
