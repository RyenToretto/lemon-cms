<!--
@file: multipleLang.vue
@createBy: lufei
@description: 多语言
 -->
<template>
  <div class="multiple-lang" v-bind="$attrs">
    <el-form ref="form" :model="value">
      <el-form-item v-for="(name, code) in value" :key="code" :prop="`${code}`">
        <div class="multiple-lang-item">
          <el-input v-model="value[code]" class="multiple-lang-item__name">
            <template #prepend>
              {{ code | language }}
            </template>
          </el-input>
          <el-button
            v-if="!defaultLang.includes(code)"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="handleDel(code)"
          ></el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-dropdown trigger="click" @command="handleAdd">
      <el-button size="mini" type="primary" plain>添加</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(name, code) in $MAPS.language"
          :key="code"
          :command="code"
          :disabled="code in value"
          >{{ name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
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
    },
    defaultLang: {
      type: Array,
      default() {
        return []
      }
    },
    required: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {
    value: {
      handler() {
        this.elFormItem.validate()
      },
      deep: true
    }
  },

  created() {},
  mounted() {
    // this.injectToElForm()
  },
  beforeUnmount() {
    // this.removeFromElForm()
  },
  methods: {
    handleAdd(code) {
      this.$set(this.value, code, '')
    },
    handleDel(code) {
      this.$delete(this.value, code)
    },
    transToObj(langEntries) {
      return Object.fromEntries(langEntries.filter((v) => !!v[0]))
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
.multiple-lang {
  .el-form-item {
    margin-bottom: 8px;
  }
  /deep/.el-form-item__error {
    margin-bottom: 0;
  }
}
</style>
