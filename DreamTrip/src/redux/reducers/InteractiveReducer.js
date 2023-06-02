const initial = {
  check: 0
}

const InteractiveReducer = (interact = initial, action) => {
  switch (action.type) {
      case 'CHANGE': {
          const temp = {
              check: Math.floor(Math.random() * 100000)
          }
          return temp
      }
      default:
            return interact;
  }
}

export default InteractiveReducer;