<!--
@file: multipleLang.vue
@createBy: lufei
@description: 多语言
 -->
<template>
  <div class="multiple-lang" v-bind="$attrs">
    <el-form ref="form" :model="form">
      <el-form-item
        v-for="(item, index) in form.langs"
        :key="item.code"
        :prop="`langs.${index}[1]`"
        :rules="[{ required: true }]"
      >
        <div class="multiple-lang-item">
          <el-select v-model="form.langs[index][0]" class="multiple-lang-item__lang">
            <el-option
              v-for="(name, code) in $MAPS.language"
              :key="code"
              :value="code"
              :label="name"
            ></el-option>
          </el-select>
          <el-input v-model="form.langs[index][1]" class="multiple-lang-item__name"></el-input>
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            @click="handleDel(index)"
          ></el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-button size="mini" type="primary" plain @click="handleAdd">添加</el-button>
  </div>
</template>

<script>
export default {
  name: 'MultipleLang',
  components: {},
  inject: ['elForm', 'elFormItem'],
  props: {
    value: {
      required: true,
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        langs: []
      }
    }
  },
  computed: {},
  watch: {
    // value: {
    //   handler (v, ov) {
    //     // const langEntries = Object.entries(v)
    //     // this.form.langs = langEntries
    //   },
    //   immediate: true
    // },
    'form.langs': function (v) {
      // this.$utils.debounce(this.transToObj(v), 300)
      // const prop = this.elFormItem.prop
      // this.elForm.validateField(prop)
      this.$refs.form.validate().then(() => {
        this.$emit('input', this.transToObj(v))
        this.elFormItem.validate()
      })
    }
  },

  created() {
    this.init()
  },
  mounted() {
    this.injectToElForm()
  },
  beforeUnmount() {
    this.removeFromElForm()
  },
  methods: {
    init() {
      const langEntries = Object.entries(this.value)
      this.form.langs = langEntries
    },
    handleAdd() {
      this.form.langs.push(['', ''])
    },
    handleDel(index) {
      this.form.langs.splice(index, 1)
    },
    transToObj(langEntries) {
      const langObj = Object.fromEntries(langEntries.filter((v) => !!v[0]))
      return langObj
    },
    injectToElForm() {
      this.elForm._multipleLangInstance = this.elForm._multipleLangInstance || []
      this.elForm._multipleLangInstance.push(this)
    },
    removeFromElForm() {
      this.elForm._multipleLangInstance = this.elForm._multipleLangInstance || []
      const index = this.elForm._multipleLangInstance.findIndex((v) => v === this)
      if (index >= 0) {
        this.elForm._multipleLangInstance.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.multiple-lang-item {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin-bottom: 8px;
}
.multiple-lang-item__lang {
  width: 80px;
  margin-right: 8px;
  flex-shrink: 0;
}
.multiple-lang-item {
  & > .el-button {
    padding-left: 12px;
    padding-right: 12px;
    margin-left: 8px;
  }
}
</style>
