<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const throttle = (func, wait) => {
  let pre = 0;
  return function(e){
    const context = this;
    let now = Date.now();
    if (now - pre >= wait){
       func.call(context, e);
       pre = Date.now();
    }
  }
}

export default {
  watch: {
    '$store.state.mode': {
      handler (val) {
        if (val === 'edit') {
          window.removeEventListener('mousemove', this.handleMouseMove)
        } else {
          window.addEventListener('mousemove', this.handleMouseMove)
        }
        if (val === 'delete') {
          document.body.style.cursor = 'no-drop'
        } else {
          document.body.style.cursor = ''
        }
      },
      immediate: true
    }
  },
  methods: {
    handleMouseMove: throttle(function ({ pageX, pageY }) {
      this.$store.commit({
        type: 'updatePos',
        pos: [pageX, pageY]
      })
    }, 18)
  },

}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #e1e1e2;
  }
}
html, body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
