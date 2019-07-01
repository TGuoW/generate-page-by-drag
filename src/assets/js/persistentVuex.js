const typeofVariable = function (varibale) {
  return Object.prototype.toString.call(varibale).slice(8,-1)
}

const persistentVuex = function (options = {}) {
  return function (store) {
    let state = Object.keys(store.state)
    const { includes, excludes } = options
    if (includes) {
      if (typeofVariable(includes) !== 'Array') {
        throw new Error('Includes must be an array type')
      }
      state = state.filter(item => includes.includes(item))
    }
    if (excludes) {
      if (typeofVariable(excludes) !== 'Array') {
        throw new Error('Excludes must be an array type')
      }
      state = state.filter(item => !excludes.includes(item))
    }

    state.forEach(item => {
      if (localStorage.getItem(item) !== null) {
        let tmp = localStorage.getItem(item)
        try {
          tmp = JSON.parse(localStorage.getItem(item))
        } catch (e) {
          tmp = localStorage.getItem(item)
        } finally {
          store.state[item] = tmp
        }
      }
    })

    window.onbeforeunload = () => {
      state.forEach(item => {
        const tmp = store.state[item]
        if (typeof tmp === 'object') {
          localStorage.setItem(item, JSON.stringify(tmp))
        } else {
          localStorage.setItem(item, tmp)
        }
      })
    }
  }
}

export default persistentVuex
