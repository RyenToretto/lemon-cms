/**
 * @file: waterMark.js
 * @createBy: lufei
 * @description: 水印
 **/
import Vue from 'vue'
import WaterMask from './WaterMask.vue'

const Mask = Vue.extend(WaterMask)
function showMask(el, binding) {
  const visible = binding.value !== undefined ? Boolean(binding.value) : true
  if (!['absolute', 'fixed'].includes(el.originalPosition)) {
    el.style.position = 'relative'
  }
  if (!el.domVisible) {
    el.appendChild(el.mask)
    el.domVisible = true
  }
  Vue.nextTick(() => {
    el.instance.visible = visible
  })
}
export default {
  name: 'waterMark',
  bind(el, binding, vnode) {
    const ctx = vnode.context
    const mask = new Mask({
      el: document.createElement('div'),
      data: {
        foo: ctx.$NICK_NAME,
        visible: true
      }
    })
    el.instance = mask
    el.mask = mask.$el
  },
  inserted(el, binding) {
    el.originalPosition = getComputedStyle(el).position
    showMask(el, binding)
  },
  update(el, binding) {
    showMask(el, binding)
  },
  unbind(el) {
    el.instance && el.instance.$destroy()
  }
}
