<template>
    <v-app>
        <nav>
            <v-toolbar dark color="green">
                <v-toolbar-title>
                    <nuxt-link to="/">NodeBird</nuxt-link>
                </v-toolbar-title>    
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-text-field prepend-icon="mdi-magnify" label="검색" hide-details :style="{display: 'flex', alignItems: 'center'}"></v-text-field>
                    <v-btn text nuxt to="/profile">
                        <div>프로필</div>
                    </v-btn>
                    <v-btn text nuxt to="/signup">
                        <div>회원가입</div>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
        </nav>
        <div>{{name}}</div>
        <v-btn @click="onChangeName">byebye</v-btn>
        <v-row >
            <v-col cols="12" md="4">
                <login-form></login-form>
            </v-col>
            <v-col cols="12" md="8">
                <nuxt />
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
import LoginForm from '~/components/LoginForm';
export default {
    components: {
        LoginForm,
    },
    computed: {
        name() {
            return this.$store.state.posts.name;
        }
    },
    methods: {
        onChangeName() {
            this.$store.commit('posts/BYE');
        }
    }
};
</script>

<style>

</style>
