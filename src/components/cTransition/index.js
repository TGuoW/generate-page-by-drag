import Vue from 'vue'
import Main from './cTransition.vue'
const CTransiionConstructor = Vue.extend(Main)

let instance

const CTransiion = function (options) {
    instance = new CTransiionConstructor({
        props: {
            target: options.target,
            needBg: options.needBg
        },
        data: {
            render: options.render
        }
    })
    instance.vm = instance.$mount()
    console.log(instance.vm)
    const parentElm = document.querySelector(options.target)
    parentElm.appendChild(instance.vm.$el)
    instance.vm.visible = true;
    instance.dom = instance.vm.$el
    return instance.vm
}

export default CTransiion
