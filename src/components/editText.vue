<template>
  <span
    :style="{
      height: height + 'px'
    }"
    @keyup.enter="hideInput"
  >
    <el-input
      v-if="visble && !inputValue.value"
      ref="input"
      v-model="inputValue"
      @blur="hideInput"
    />
    <el-input
      v-if="visble && inputValue.value"
      ref="input2"
      v-model="inputValue.label"
      style="width: 80px"
      size="mini"
      @blur="hideInput"
    />
    <el-input
      v-if="visble && inputValue.value"
      ref="input3"
      v-model="inputValue.value"
      style="width: 80px"
      size="mini"
      @blur="hideInput"
    />
    <span
      v-show="!visble"
      @click.self="showInput"
    >
      {{ value.label || value }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default () {
        return ''
      }
    },
    height: {
      type: Number,
      default () {
        return 32
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
      },
      deep: true
    }
  },
  methods: {
    showInput () {
      this.visble = true
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
        if (this.$refs.input2) {
          this.$refs.input2.focus()
        }
      })
    },
    hideInput () {
      setTimeout(() => {
        if (this.$refs.input2) {
          if (!this.$refs.input2.focused && !this.$refs.input3.focused) {
            this.visble = false
          }
        } else {
          this.visble = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .main {
    height: 32px;
  }
</style>
