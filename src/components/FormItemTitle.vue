<template>
  <div
    class="main"
    @click="showInput"
    @keyup.enter="hideInput"
  >
    <el-input
      v-show="visble"
      ref="input"
      v-model="inputValue"
      @blur="hideInput"
    />
    <p
      v-show="!visble"
    >
      {{ value }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      visble: false,
      inputValue: this.value
    }
  },
  watch: {
    inputValue: {
      handler (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    showInput () {
      this.visble = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    hideInput () {
      this.visble = false
      this.$emit('change')
    }
  }
}
</script>

<style scoped>
  .main {
    height: 32px;
  }
</style>
