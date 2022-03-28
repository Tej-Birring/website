import App from '/@/App.vue'

export default [
    {
        path: '/',
        component: ()=>import('/@/views/Home.vue')
    },
    {
        path: '/about',
        component: ()=>import('/@/views/About.vue')
    },
    {
        path: '/posts',
        component: ()=>import('/@/views/Posts.vue'),
    },
    {
        path: '/posts/:id',
        component: () => import('/@/views/Post.vue')
    }
];
