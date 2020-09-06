export const state = () => ({
    mainPosts: [],
    hasMorePost: true,
});

const totalPosts = 51;
const limit = 10;

export const mutations = {
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload); //최신게시글은 맨앞 푸시는 맨뒤
    },
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.id); //게시물중에 해당아이디를 가진 인덱스를 리턴해줌
        state.mainPosts.splice(index, 1);
    },
    editMainPost(state, payload) {
        //const index = state.mainPosts.findIndex(v => v.id === payload.id); //게시물중에 해당아이디를 가진 인덱스를 리턴해줌
        //state.mainPosts.splice(index, 1);
    },
    addComment(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.postId); 
        state.mainPosts[index].Comments.unshift(payload);
    },
    loadPosts(state, payload) {
        const diff = totalPosts - state.mainPosts.length;
        const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString,
            User: {
                id: 1,
                nickname: '자동생성자',
            },
            content: `Hello~${Math.random().toString()}`,
            Comments: [],
            Images: [],
        }));
        state.mainPosts = state.mainPosts.concat(fakePosts);
        state.hasMorePost = fakePosts.length === limit;
    }
};

export const actions = {
    add({commit}, payload) {
        //나중에 여기에 서버에 게시글 등록 요청 보냄 


        commit('addMainPost', payload);
    },
    remove({commit}, payload) {

        // 서버에서 게시글 삭제 요청 여기에서 보냄

        commit('removeMainPost', payload);
    },
    edit({commit}, payload) {

        // 서버에서 게시글 수정 요청 여기에서 보냄

        commit('editMainPost', payload);
    },
    addComment({commit}, payload) {
        //나중에 여기에 서버에 댓글 등록 요청 보냄 


        commit('addComment', payload);
    },
    loadPosts({commit, state}, payload) {
        if (state.hasMorePost){
            commit('loadPosts');
        }
        
    },
}

