<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    title: String,
    items: Array
});

defineEmits(["menu-item-clicked"]);
</script>


<template>
        <div class="logoText" ref="logoText">{{ title }}</div>
        <div class="menuItems" ref="menuItems">
            <router-link
                v-for="(item, idx) in items"
                :key="idx"
                :to="item.path"
                class="menuItem"
                active-class="active"
                @click.native="$emit('menu-item-clicked')"
            >
                <ion-icon :name="item.ionicon" v-if="item.ionicon" class="mr-2 menuIcon"></ion-icon>
                <span class="menuName">{{ item.name }}</span>
            </router-link>
        </div>
</template>


<style scoped lang="scss">
.logoText {
    font-size: 1.5rem;
    letter-spacing: 0.34rem;
    line-height: 1.2;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 0.625rem;
    color: $clrWhite;
}

.menuItems {
    margin-top: 2.5rem;
    margin-bottom: 3.125rem;
    .menuItem {
        display: flex;
        flex-flow: row nowrap;
        justify-content: start;
        align-items: center;
        margin-bottom: 0.55rem;
        color: $clrGray;
        &.active {
            color: $clrWhite;
            // .menuIcon {
            //     font-size: 1.25rem;
            // }
            .menuName {
                margin-left: 0.25rem;
            }
        }
        &:hover {
            .menuName {
                margin-left: 0.25rem;
            }
        }

        .menuIcon {
          @include smooth-animation(0.3s);
        }

        .menuName {
          text-decoration: none;
          font-family: $font-Montserrat;
          font-weight: 500;
          @include smooth-animation(0.3s);
        }
    }
}
</style>
