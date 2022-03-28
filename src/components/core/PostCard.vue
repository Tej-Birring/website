<template>
  <div class="blog-post"
       v-animate:fadeInTop.inView="{delay: (idx+1)*200}" :class="getRowSpanClassForBlogPost(post)"
    > <!-- v-show="!hidden" -->
    <c-image v-if="post.featureImg" :data="post.featureImg" alt="Post feature image." class="mb-10" v-animate:accordion /> <!-- @imgReady="setImgLoaded" -->
    <div class="topic mb-4" v-if="post.topic">{{post.topic?.name}}</div>
    <h2 class="mb-6"><router-link :to="post.readRoute">{{post.title}}</router-link></h2>
    <p class="mb-8 flex flex-row justify-start items-center" v-if="post.published">
      <ion-icon name="calendar" class="mr-2" />
      {{$utils.dateObjToDateString(post.published.day)}}
    </p>
    <c-notion-rich-text :data="post.short" v-if="post.short" />
    <!--      <div class="h-full flex-grow"></div>-->
    <button class="ml-auto mt-10" @click.prevent.stop="navigateToPost(post)">
      <!-- <ion-icon name="rocket" class="mr-2 text-lg" /> -->
      Read more
    </button>
    <hr v-if="post.tags.length>0" class="tag-hr"/>
    <div class="tag mr-1 mt-1" v-for="(tag, idx1) in post.tags" :key="`post-${idx}-tag-${idx1}`">
      {{tag.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
  inject: ["$utils"],
  props: {
    post: Object,
    idx: Number,
  },
  data() {
    return {
      imgLoaded: false,
    }
  },
  computed: {
    hidden() {
      return this.post?.featureImg && !this.imgLoaded;
    }
  },
  methods: {
    getRowSpanClassForBlogPost(blogPost) {
      return 1;
      let ret = 1;
      if (blogPost.featureImg)
        ret++;
      if (blogPost.short.length>0)
        ret++;
      ret = `row-span-${ret}`;
      return ret;
    },
    setImgLoaded() {
      this.imgLoaded = true;
    },
    navigateToPost(post) {
      if (!post?.readRoute) return;
      this.$router.push(post.readRoute);
    }
  }
}
</script>


<style scoped lang="scss">
.blog-post {
  background-color: $clrDavysGray;
  padding: 2.1rem 2.1rem 1.3rem;
@screen lg {
  padding: 3.4rem 3.4rem 2.1rem;
}
@include box-shadow();
//display: flex;
//flex-flow: column nowrap;
}

.topic {
  background-color: darken($clrWhite, 21%);
  color: darken($clrGoldFusion, 16%);
  padding: 0.55rem 1.34rem;
  letter-spacing: 0.08rem;
  display: inline-block;
  font-size: .89rem;
  font-weight: 800;
}

.tag-hr {
  margin-top: 0.89rem;
  margin-bottom: 0.55rem;
  border-color: $clrSonicSilver;
}

.tag {
  font-size: 0.7rem;
  font-weight: 700;
  background-color: $clrSonicSilver;
  color: lighten($clrSonicSilver, 21%);
  padding: 0.55rem;
  display: inline-block;
}
</style>
