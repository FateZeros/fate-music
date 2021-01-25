const loginState = {
  account: {},
  bindings: [],
  profile: {},
  token: '',
  showLoginModal: false
}

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case 'SHOW_LOGIN':
      return {
        ...state,
        showLoginModal: true
      }
    case 'HIDE_LOGIN':
      return {
        ...state,
        showLoginModal: false
      }
    case 'SET_LOGIN_USERINFO': {
      const payload = action.payload
      return {
        account: payload.account,
        bindings: payload.bindings,
        profile: payload.profile,
        token: payload.token,
        showLoginModal: false
      }
    }
    default:
      return state
  }
}

export default loginReducer
