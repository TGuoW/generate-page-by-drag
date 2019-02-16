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
      style="width: 80px"
      v-model="inputValue.label"
      size="mini"
      @blur="hideInput"
    />
    <el-input
      v-if="visble && inputValue.value"
      ref="input3"
      style="width: 80px"
      v-model="inputValue.value"
      size="mini"
      @blur="hideInput"
    />
    <span
      @click.self="showInput"
      v-show="!visble"
    >
      {{ value.label || value }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String | Object,
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
        } else {
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
