<!--
      See:
        https://vuejs.org/guide/extras/rendering-mechanism.html#patch-flags
        https://vuejs.org/guide/extras/render-function.html
-->

<script>
import { h, defineProps } from "vue";

export default {
  props: {
    data: Array, // notion rich_text data array
    class: String,
    elTag: {
      type: String,
      default: "p"
    }
  },
  setup(props) {
    function mapRichTextComponents(data) {
      const ret = [];
      if (!Array.isArray(data)) return ret;

      data.forEach((textEntry)=>{
        const textContent = textEntry.text.content;
        const textLink = textEntry.text.link?.url;
        const textStyle = textEntry.annotations;
        // apply style
        let _ret = textContent;
        if (textStyle.bold)
          _ret = h("strong", _ret);
        if (textStyle.italic)
          _ret = h("em", _ret);
        if (textStyle.underline)
          _ret = h("u", {class:'underline'}, _ret);
        if (textStyle.strikethrough)
          _ret = h("u", {class:'line-through'}, _ret);
        if (textLink)
          _ret = h("a",
              {
                href: textLink
              } ,_ret);

        ret.push(_ret);
      });
      return ret;
    }

    return () => h(props.elTag,
        {
          class: props.class,
          style: {whiteSpace: "pre-wrap"}
        },
      mapRichTextComponents(props.data)
    );

  }
}
</script>

<!--<script setup>-->

<!--  });-->

<!--  function computeStyle(item) {-->
<!--      const base = {-->
<!--      'italic': item?.annotations?.italic,-->
<!--      'font-bold': item?.annotations?.bold,-->
<!--      'underline': item?.annotations?.underline,-->
<!--      'line-through': item?.annotations?.strikethrough-->
<!--      };-->
<!--    }-->
<!--</script>-->


<!--<template>-->
<!--  <component :is="elTag">-->
<!--    <span v-for="(item, idx) in data" :key="idx" :class="computeStyle(item)">-->
<!--      {{item?.text?.content}}-->
<!--    </span>-->
<!--  </component>-->
<!--</template>-->

<!--<script setup>-->
<!--  import { defineProps } from "vue";-->
<!--  const props = defineProps({-->
<!--    data: Array, // notion rich_text data array-->
<!--    class: String,-->
<!--    elTag: {-->
<!--      type: String,-->
<!--      default: "p"-->
<!--    }-->
<!--  });-->

<!--  function computeStyle(item) {-->
<!--    const base = {-->
<!--      'italic': item?.annotations?.italic,-->
<!--      'font-bold': item?.annotations?.bold,-->
<!--      'underline': item?.annotations?.underline,-->
<!--      'line-through': item?.annotations?.strikethrough-->
<!--    };-->

<!--    if (props?.class) {-->
<!--      const classArr = props.class.split(" ");-->
<!--      classArr.forEach((_class) => {-->
<!--        base[_class] = true-->
<!--      });-->
<!--    }-->

<!--    return base;-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
