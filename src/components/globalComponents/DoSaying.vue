<!--
@file: DoSaying.vue
@createBy: koujianfeng
 -->
<template>
  <div class="do-saying">
    <div class="do-saying-config-wrapper">
      <template v-for="(doSaying, index) in value">
        <div :key="index" class="do-saying-config-card">
          <div
            v-if="!$attrs.disabled && index + 1 > min"
            class="do-saying-remove"
            @click="removeDoSaying($event, value, index)"
          >
            <i class="el-icon-close"></i>
          </div>

          <el-form :ref="`item${index}`" class="do-saying-item" :model="doSaying">
            <el-form-item
              class="saying"
              prop="saying"
              :rules="[{ required: true, message: $attrs.placeholder || '请输入文本' }]"
            >
              <el-input
                v-model.trim="doSaying.saying"
                type="saying"
                autocomplete="off"
                :placeholder="$attrs.placeholder || '请输入文本'"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </div>

    <div v-if="showAddButton" class="do-saying-add">
      <el-button
        class="do-saying-add-btn"
        :type="$attrs.disabled ? 'info' : 'primary'"
        size="mini"
        @click="addDoSaying($event, value)"
        >新增</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoSaying',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Array, String],
      default() {
        return [{ saying: '' }]
      }
    },
    min: {
      type: [Number, String],
      default() {
        return 1
      }
    },
    limit: {
      type: [Number, String],
      default() {
        return 1
      }
    }
  },
  computed: {
    showAddButton() {
      return this.value && +this.limit > 1 && +this.limit > +this.value.length
    }
  },
  methods: {
    addDoSaying(e, doSaying) {
      if (this.$attrs.disabled) {
        return
      }
      doSaying.push({ saying: '' })
      this.$nextTick(() => {
        try {
          const doSayingElement = e.path.find((ele) => ele.className === 'do-saying')
          if (doSayingElement) {
            const arr = doSayingElement.querySelectorAll('.do-saying-config-card')
            const lastDoSaying = arr[arr.length - 1]
            lastDoSaying.querySelector('.do-saying-item input').focus()
          }
        } catch (err) {}
      })
    },
    removeDoSaying(_, doSayingList, index) {
      this.$confirm('确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          doSayingList.splice(index, 1)
        })
        .catch(() => {})
    },
    isValidator() {
      return new Promise((resolve) => {
        const promiseList = []
        for (let i = 0; i <= this.value.length - 1; i++) {
          promiseList.push(this.$refs[`item${i}`][0].validate())
        }
        Promise.all(promiseList)
          .then(() => resolve(true))
          .catch(() => resolve(false))
      })
    }
  }
}
</script>

<style lang="less" scoped>
@ico-width: 40px;

.do-saying {
  box-sizing: border-box;
  width: 100%;
  color: #909399;
  font-size: 14px;
  .do-saying-config-wrapper {
    box-sizing: border-box;
    width: 100%;
    .do-saying-config-card {
      box-sizing: border-box;
      margin-top: 8px;
      padding: 16px 40px 16px 16px;
      width: 100%;
      border-radius: 6px;
      background-color: #f5f7fa;
      position: relative;
      &:first-child {
        margin-top: 0;
      }
      .do-saying-remove {
        box-sizing: border-box;
        width: @ico-width;
        height: @ico-width;
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 16px;
        right: 0;
        cursor: pointer;
      }
      /deep/.do-saying-item {
        box-sizing: border-box;
        width: 100%;
        text-align: left;
        font-size: 16px;
        .el-form-item {
          &.saying {
            box-sizing: border-box;
          }
        }
      }
    }
  }
  .do-saying-add {
    box-sizing: border-box;
    padding-top: 8px;
    line-height: normal;
    .do-saying-add-btn {
      box-sizing: border-box;
    }
  }
}
</style>
