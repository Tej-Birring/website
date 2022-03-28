import CTitle from "/@/components/core/Title.vue";
import CMenu from "/@/components/core/Menu.vue";
import CHorizontalIcons from "/@/components/core/HorizontalIcons.vue";
import CDetails from "/@/components/core/Details.vue";
import CNotionRichText from "/@/components/core/NotionRichText.vue";
import CNotionBlock from "/@/components/core/NotionBlock.vue";
import CNotionImage from "/@/components/core/NotionImage.vue";
import CBackgroundImage from "/@/components/core/BackgroundImage.vue";
import CImage from "/@/components/core/Image.vue";
import CPostCard from "/@/components/core/PostCard.vue";

export default {
    install(app, options) {
        app.component("c-title", CTitle);
        app.component("c-menu", CMenu);
        app.component("c-h-icons", CHorizontalIcons);
        app.component("c-details", CDetails);
        app.component("c-notion-rich-text", CNotionRichText);
        app.component("c-notion-block", CNotionBlock);
        app.component("c-background-image", CBackgroundImage);
        app.component("c-image", CImage);
        app.component("c-notion-image", CNotionImage);
        app.component("c-post", CPostCard);
    }
}
