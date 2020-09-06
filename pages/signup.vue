<template>
    <div>
        <v-container>
            <v-card>
                <v-container>
                    <v-subheader>회원가입</v-subheader>
                    <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                        <v-text-field
                            v-model="email"
                            label="이메일"
                            type="email"
                            required
                            :rules="emailRules"
                        />
                        <v-text-field
                            v-model="password"
                            label="비밀번호"
                            type="password"
                            required
                            :rules="passwordRules"
                        />
                        <v-text-field
                            v-model="passwordCheck"
                            label="비밀번호확인"
                            type="password"
                            required
                            :rules="passwordCheckRules"
                        />
                        <v-text-field
                            v-model="nickname"
                            label="닉네임"
                            type="nickname"
                            required
                            :rules="nicknameRules"
                        />
                        <v-checkbox
                            v-model="terms"
                            required
                            label="제로초 말을 잘 들을 것을 약속합니다."
                            :rules="[v => !!v || '약관에 동의해야합니다']"
                        />
                        <v-btn color="green" type="submit">가입하기</v-btn>
                    </v-form>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                valid: false,
                email: '',
                password: '',
                passwordCheck: '',
                nickname: '',
                terms: false,
                emailRules: [
                    v => !!v || 'E-mail is required', //값이 없다 정규식
                    v => /.+@.+/.test(v) || 'E-mail must be valid',// 이메일 형식이 아닌경우
                    //v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'password is required', //값이 없다 정규식
                ],
                passwordCheckRules: [
                    v => !!v || 'passwordCheck is required', //값이 없다 정규식
                    v => v === this.password || '비밀번호가 일치하기 않습니다', 
                ],
                nicknameRules: [
                    v => !!v || 'nickname is required', //값이 없다 정규식
                ],
            }
        },
        computed: {
            me() {
                return this.$store.state.users.me; 
            }
        },
        watch: {
            me(value, oldValue) {
                if (value) {
                    this.$router.push({
                        path: '/',
                    });
                }               
            }
        },
        methods: {
            onSubmitForm() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('users/signup', {
                        nickname: this.nickname,
                        email: this.email,
                    }).then(() => {
                        this.$router.push({
                            path: '/'
                        });
                    }).catch(() => {
                        alert('회원가입 실패!');
                    })

                }
            }
        },
        head() {
            return {
                title: '회원가입'
            }
        },
        middleware: 'anonymous',
    }
</script>

<style>

</style>
