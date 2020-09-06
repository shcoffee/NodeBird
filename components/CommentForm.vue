<template>
    <v-form ref="form" v-model="valid" style="position: relative" @submit.prevent="onSubmitForm">
        <v-textarea
            filled
            auto-grow
            label="댓글달기"
            v-model="content"
            :hide-details="hideDetails"   
            :success="success"   
            :success-messages="successMessages"   
            @input="onChangeTextarea"
        ></v-textarea> 
        <v-btn dark absolute top right type="submit" color="green">삐약</v-btn>
    </v-form>
</template>

<script>
    export default {
        props: {
            postId: { //부모한테 부모아이디만 받음
                type: Number,
                required: true, 
            },
        },
        data() {
            return {
                valid: false,
                hideDetails: true,
                successMessages: '',
                success: false,
                content: '',
            }
        },
        computed: {
            me() {
                return this.$store.state.users.me; 
            }
        },
        methods: {
            onChangeTextarea(value) {
                if (value.length) { //글작성 후 초기화
                    this.hideDetails = true;
                    this.success = false;
                    this.successMessages = '';
                }
            },
            onSubmitForm() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('posts/addComment', {
                        id: Date.now(),
                        postId: this.postId,
                        content: this.content,
                        User: {
                            nickname: this.me.nickname,
                        }
                    }).then(() => {
                        this.content = '';
                        this.hideDetails = false;
                        this.success = true;
                        this.successMessages = '댓글 작성이 완료되었습니다.';
                    }).catch(() => {

                    })
                }
            },

        },
    }
</script>

<style lang="scss" scoped>

</style>