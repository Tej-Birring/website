import notification from "./notification.vue";

export default {
    install(app, options) {
        app.component("v-notification", notification);
    }
}
