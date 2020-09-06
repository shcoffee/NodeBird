export default function({store, redirect}) {
    if (!store.state.users.me) {
        redirect('/');//로그인한 상태가 아니면 메인페이지로 
    }
}