<template>
    <v-container  v-if="!me">
        <v-card>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-container>
                    <v-text-field label="이메일" type="email" required 
                        v-model="email" :rules="emailRules" />
                    <v-text-field label="비밀번호" type="password" required 
                        v-model="password" :ruels="passwordRules"/>
                    <v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
                    <v-btn nuxt to="/signup">회원가입</v-btn>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
    <v-container v-else>
        <v-card>
            <v-container>
                {{me.nickname}}님, 로그인되었습니다
                <v-btn @click="onLogout" >로그아웃</v-btn>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required', //값이 없다 정규식
                v => /.+@.+/.test(v) || 'E-mail must be valid',// 이메일 형식이 아닌경우
                //v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'password is required', //값이 없다 정규식
            ],
        }
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        }
    },
    methods: {
        onSubmitForm() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('users/login', {
                    email: this.email,
                    nickname: '서버에서온닉네임'
                })
            } else {
                alert('폼이 유효하지않습니다!');
            }
        }, 
        onLogout() {
            this.$store.dispatch('users/logout');
        }
    }
}
</script>

<style>

</style>