const loginState = {
  userName: 'Fate'
}

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case 'TEST':
      return { userName: '121' }
    default:
      return state
  }
}

export default loginReducer
