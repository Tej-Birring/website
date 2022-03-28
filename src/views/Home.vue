<script setup>
import { inject, ref } from 'vue'

const socialList = [
  {
    href: "https://www.facebook.com/",
    ionicon: "logo-linkedin"
  },
  {
    href: "https://www.facebook.com/",
    ionicon: "logo-github"
  },
  {
    href: "https://www.facebook.com/",
    ionicon: "logo-discord"
  }
];


// const $firestore = inject("$firestore");
// $firestore.getDocument("staticContent/home").then((res)=>{content.value=res})


const $utils = inject("$utils");
const $notion = inject("$notion");

const img = ref(null);
const content = ref(null);
const social = ref(null);

$notion.getPage("b552d1ac6b994d55a85fd46bbf8838ec")
    .then((res)=>{
      content.value=res?.properties;
      if (content.value?.MainImage) {
        return $utils.fetchImage(content.value.MainImage?.files[0]?.file?.url);
      }
    })
    .then((imgStr)=>{
      img.value = imgStr;
    });

$notion.getDatabase("051c0d2a4e9348c68ccfea27ed4f7a90")
    .then((res)=>{
      social.value = res?.results.map((page)=>{
        return {
          href: page.properties?.URL?.url,
          ionicon: page.properties?.Icon?.rich_text[0]?.plain_text
        }
      });
    })



</script>


<template>
  <div class="h-full flex flex-row justify-center items-center">
    <div class="flex lg:flex-row <lg:flex-col justify-center lg:items-start <lg:items-center" v-if="content">
      <div class="avatar" v-animate:fadeIn>
        <div class="image">
          <img :src="img" alt="Avatar photograph" class="slow-fade-in" v-if="img" v-animate:fadeIn="{delay: 1500}"/>
        </div>
      </div>
          <div class="details <lg:text-center <lg:pt-4 max-w-90">
            <h3 class="lg:ml-5 mb-1"  v-animate:fadeIn>{{ content?.Title?.rich_text[0]?.plain_text }}</h3>
            <p class="lg:ml-6 max-w-75" v-animate:accordion.long="{delay: 500}">
              <c-notion-rich-text :data="content?.Slogan?.rich_text"/>
            </p>
            <button class="mt-5 lg:ml-6 <lg:mx-auto" v-animate:fadeIn.vShort="{delay: 2500}" @click.prevent.stop="()=>{$router.replace('/about')}">Learn more</button>
            <c-h-icons :items="social" class="mt-5 lg:ml-6" v-animate:fadeInRight="{delay: 3000}" />
          </div>
    </div>
  </div>
</template>


<style scoped lang="scss">

.avatar {
  position: relative;
  min-height: 200px;
  min-width: 200px;
  .image {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    border-radius: 50%;
    @media (min-width: 1024px) {
      animation: morph-big-scr 8s ease-in-out infinite 1s;
    }
    @media (max-width: 1025px) {
      animation: morph-sm-scr 8s ease-in-out infinite 1s;
    }

    overflow: hidden;
    border: 10px solid rgba(255, 255, 255, 0.3);
    img {
      color: rgba(0, 0, 0, 0) !important;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}

@keyframes morph-big-scr {
  20% {
    border-radius: 50%;
  }
  40% {
    border-radius: 25% 75% 75% 25%;
  }
  60% {
    border-radius: 0;
  }
  80% {
    border-radius: 75% 25% 25% 75%;
  }
  100% {
    border-radius: 50%;
  }
}

@keyframes morph-sm-scr {
  20% {
    border-radius: 50%;
  }
  40% {
    border-radius: 25% 25% 75% 75%;
  }
  60% {
    border-radius: 0;
  }
  80% {
    border-radius: 75% 75% 25% 25%;
  }
  100% {
    border-radius: 50%;
  }
}
</style>
