<template>
      <div class="flex flex-row justify-between items-center mb-8" v-animate:fadeIn>
        <h1>Posts</h1>
      </div>
<!--  {{blogPosts}}-->
  <div class="blog-posts-grid gap-8 xl:gap-10">
    <c-post v-for="(post, idx) in blogPosts" :key="`post-${idx}`" :post="post" :idx="idx"/>
  </div>
  <div class="flex flex-row justify-center items-center mt-21">
    <button v-if="moreBlogPostsAvailable && !$utils.loading.value" @click.prevent.stop="getData" v-animate:fadeIn>Load more...</button>
    <p v-else-if="blogPosts.length>0 && !$utils.loading.value" class="clr-muted" v-animate:fadeInTop.vvLong>No more posts.</p>
    <p v-else-if="blogPosts.length===0 && !$utils.loading.value" class="clr-muted" v-animate:fadeInTop.vvLong>No posts to display.</p>
  </div>

</template>

<script setup>
import {inject, ref} from "vue";

const $utils = inject("$utils");
const $notion = inject("$notion");

const blogPosts = ref([]);
const nBlogPostsToFetch = 12;
let fetchCursor = undefined;
const moreBlogPostsAvailable = ref(null);

function getData() {
  $utils.loading.value = true;
  $notion.getDatabase("aca95b6a1f5b4e72a40ab26c41a345a6", [{property: "Published", direction: "descending"}],
      {
        property: "Status",
        select: {
          equals: "Published"
        },
      },
      nBlogPostsToFetch,
      fetchCursor
  )
      .then((res)=>{
        moreBlogPostsAvailable.value = res?.has_more;
        fetchCursor = res?.next_cursor;
        const posts = res?.results.map((page)=>{
          return {
            created: page.properties?.["Created"]?.created_time,
            lastEdited: page.properties?.["Last Edited"]?.last_edited_time,
            published: page.properties?.["Published"]?.date?.start,
            title: page.properties?.["Name"]?.title[0]?.plain_text,
            ionicon: page.properties?.Icon?.rich_text[0]?.plain_text,
            tags: page.properties?.Tags?.multi_select,
            topic: page.properties?.Topic?.select,
            featureImg: page.properties?.["Feature Image"]?.files?.[0]?.file?.url,
            short: page.properties?.["Short Description"]?.rich_text,
            id: page.id,
            readRoute: `/posts/${page.id}`
          }
        });
        blogPosts.value.push(...posts);
        $utils.loading.value = false;
      });
}

getData();
</script>

<style scoped lang="scss">
  .blog-posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    @screen lg {
      grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
      place-items: center stretch;
    }
    grid-auto-flow: row;
  }


</style>
