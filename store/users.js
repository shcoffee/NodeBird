export const state = () => ({
    me: null, // me가 널이 아니면 로그인 상태
    followerList: [
        {
            id: 1,
            nickname: '김',
        },
        {
            id: 2,
            nickname: '이',
        },
        {
            id: 3,
            nickname: '박',
        },
    ],
    followingList: [
        {
            id: 1,
            nickname: '김',
        },
        {
            id: 2,
            nickname: '이',
        },
        {
            id: 3,
            nickname: '박',
        },
    ],
});

export const mutations = {
    SETME(state, payload) {
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname;
    },
    addFollowing(state, payload) {
        state.followingList.push(payload);
    },
    addFollower(state, payload) {
        state.followerList.push(payload);
    },
    removeFollowing(state, payload) {
        const index = state.followingList.findIndex(v => v.id === payload.id);
        state.followingList.splice(index, 1);
    },
    removeFollower(state, payload) {
        const index = state.followerList.findIndex(v => v.id === payload.id);
        state.followerList.splice(index, 1);
    },

};

export const actions = {
    signup({commit, dispatch, state, rootState, getters, rootGetters}, payload) {
        //서버에 회원가입 요청을 보냄

        //응답이 오면 me를 세팅
        commit('SETME', payload);
        //이것도 가능하긴하지만 mutations에서 하자
        //state.me = payload;
    },
    login({commit}, payload) {
        commit('SETME', payload);
    },
    logout({commit}, payload) {
        commit('SETME', null);
    },
    changeNickname({commit}, payload) {
        commit('changeNickname', payload);
    },
    addFollowing({commit}, payload) {
        commit('addFollowing', payload);
    },
    addFollower({commit}, payload) {
        commit('addFollower', payload);
    },
    removeFollowing({commit}, payload) {
        commit('removeFollowing', payload);
    },
    removeFollower({commit}, payload) {
        commit('removeFollower', payload);
    },
};