const loginState = {
  userName: 'Fate',
  showLoginModal: false
}

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case 'TEST':
      return { userName: '121' }
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
    default:
      return state
  }
}

export default loginReducer
