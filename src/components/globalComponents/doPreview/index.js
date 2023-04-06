import DoPreview from './DoPreview.vue'

const doPreview = {}

// 注册
doPreview.install = function (Vue) {
  const DoPreviewConstructor = Vue.extend(DoPreview)

  /**
   * 挂载在vue原型上
   * @param {string[]} urlList 需要预览的图片数组
   * @param viewIndex
   */
  Vue.prototype.$doPreview = function (urlList = [], viewIndex = 0) {
    const instance = new DoPreviewConstructor()
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    instance.showPreview = true
    instance.previewImages = urlList
    instance.viewIndex = viewIndex
  }
}

export default doPreview
