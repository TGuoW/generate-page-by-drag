<script>
export default {
    data () {
        return {
            show: false
        }
    },
    mounted () {
        this.show = true
    },
    render (h) {
        // return (
        //     <transition>
        //         <p>asdad</p>
        //     </transition>
        // )
        return h('transition', {attrs: { name: 'fade' }}, this.show ? [h('p', 'hello')] : '')
        // return h('transition', this.show ? h('p', 'hello') : '')
    }
}
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

