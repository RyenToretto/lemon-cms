<!--
@file: DoQuil.vue
@createBy: koujianfeng
 -->
<template>
  <div class="do-quil">
    <div class="quil-editor-wrapper">
      <div class="quil-editor-upload"></div>
      <quill-editor
        ref="refQuilEditor"
        class="do-editor"
        :class="[qid]"
        :value="value"
        :options="editorOption"
        @change="onEditorChange"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>

      <!-- <div class="quil-editor-output"><div class="ql-editor" v-html="value"></div></div> -->
    </div>
  </div>
</template>

<script>
import { Quill, quillEditor } from 'vue-quill-editor' // https://github.surmon.me/vue-quill-editor
import { ImageExtend, QuillWatch } from '@/utils/module/quill-image-extend-module'
import debounce from '@/utils/module/debounce'

import 'quill/dist/quill.core.css' // import theme style
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  name: 'DoQuil',
  components: {
    quillEditor
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    },
    qid: {
      type: String,
      default() {
        return 'quil-editor'
      }
    },
    action: {
      // 上传接口地址
      type: String,
      default() {
        return '/lemon/api/file/upload'
      }
    },
    filename: {
      // 上传时, form 的 文件域名称, 上传文件后端取值用
      type: String,
      default() {
        return 'file'
      }
    }
  },
  data() {
    const Authorization = localStorage.getItem('token')
    return {
      editorOption: {
        placeholder: '请输入...',
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              [{ header: 1 }, { header: 2 }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ size: ['small', false, 'large', 'huge'] }],
              // [{ font: [] }], // 字体
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ script: 'sub' }, { script: 'super' }],
              ['blockquote'], // 'code-block'
              [{ direction: 'rtl' }], // 文字方向
              ['link', 'image'],
              ['clean'] // 清除格式
            ],
            handlers: {
              image() {
                QuillWatch.emit(this.quill.id) // 劫持原来的图片点击按钮事件
              }
            }
          },
          ImageExtend: {
            // size: 2, // 单位为M, 1M = 1024KB
            headers: (xhr) => {
              xhr.setRequestHeader('Authorization', Authorization)
            },
            accept: 'image/jpg, image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
            name: this.filename,
            action: this.action,
            loading: true,
            response: (res) => {
              return (res && res.result && res.result.url) || ''
            }
          }
        }
      }
    }
  },
  computed: {
    eleQuil() {
      return this.$refs.refQuilEditor.quill
    }
  },
  created() {},
  mounted() {
    // console.log('this is Quill instance:', this.eleQuil)
  },
  methods: {
    onEditorChange: debounce(function (value) {
      this.$emit('input', value.html)
      this.$emit('change', value.html)
    }, 466),
    onEditorBlur(domQuil) {
      // console.log('domQuil blur!', domQuil)
    },
    onEditorFocus(domQuil) {
      // console.log('domQuil focus!', domQuil)
    },
    onEditorReady(domQuil) {
      // console.log('domQuil ready!', domQuil)
    }
  }
}
</script>

<style lang="less" scoped>
.do-quil {
  box-sizing: border-box;
  width: 100%;
  height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .quil-editor-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    .quil-editor-upload {
      width: 200px;
      height: 40px;
      line-height: 40px;
      text-align: right;
      color: #ff4d4f;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      bottom: 100%;
      right: 0;
    }
    /deep/.do-editor {
      box-sizing: border-box;
      height: 100%;
      line-height: 1.15;
      background-color: #ffffff;
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      > .ql-toolbar {
        box-sizing: border-box;
        width: 100%;
        line-height: 1.15;
        background-color: #ffffff;
        position: sticky;
        top: 50px;
        left: 0;
        z-index: 10;
      }
      > .ql-container {
        box-sizing: border-box;
        width: 100%;
        height: auto;
        background-color: #ffffff;
        max-height: 100%;
        flex: 1;
      }
    }
    .quil-editor-output {
      box-sizing: border-box;
      margin: 12px 0 0;
      width: 100%;
      min-height: 300px;
      border: 1px solid #ccc;
      background-color: #ffffff;
      overflow-y: auto;
      resize: vertical;
    }
  }
}
</style>
