<template>
    <v-container>
        <post-form v-if="me"/>
       <div>
           <post-card v-for="(p, i) in mainPosts" :key="`${p.id}-${i}`" :post="p" />
       </div>
    </v-container>
</template>

<script>
    import PostCard from '~/components/PostCard';
    import PostForm from '~/components/PostForm';
    
    export default {
        components: {
            PostCard,
            PostForm,
        },
        data() {
            return {
                name: 'Nuxt.js',
            }
        },
        computed: {
            me() {
                return this.$store.state.users.me;
            },
            mainPosts() {
                return this.$store.state.posts.mainPosts;
            },
            hasMorePost() {
                return this.$store.state.posts.hasMorePost;
            },
        },
        fetch({store}) {
            store.dispatch('posts/loadPosts');
        },
        mounted() {
            window.addEventListener('scroll', this.onScroll);
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.onScroll);
        },
        methods: {
            onScroll() {
                if (window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight - 100) {
                    console.log('in');
                    if (this.hasMorePost) {
                        this.$store.dispatch('posts/loadPosts');
                    }
                }
            }
        },
    };
</script>

<style>

</style>
