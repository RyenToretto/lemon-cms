// 根据原列进行排序
const sortWithRef = (src, ref) => {
  const result = Object.assign([], ref)
  let cursor = -1
  src.forEach((e) => {
    const idx = result.indexOf(e)
    if (idx === -1) {
      cursor += 1
      result.splice(cursor, 0, e)
    } else {
      cursor = idx
    }
  })
  return result
}

export default {
  provide() {
    return {
      crud: this
    }
  },
  data() {
    const defaultConfigLabel = '默认配置'
    return {
      extentsProps: {}, // 自定义一些扩展属性
      tableRef: 'table',
      initFunctionName: 'search',
      hasFirstSearch: false,

      tableColumns: [], // table 所有列的信息
      hiddenColumns: [], // 要隐藏的列
      ignoreColumns: [], // 忽略的列
      systemConfigLabel: [defaultConfigLabel], // 系统定义的配置名称
      storageKey: 'config_of',
      customStorageKey: '',
      columnConfig: [],
      needDefaultInit: true,
      defaultConfigLabel,
      noNameLabel: '未命名配置',
      tableStorage: {
        activeColumnConfigLabel: defaultConfigLabel,
        columnConfig: [{ label: defaultConfigLabel, columns: [] }]
      }, // 默认列配置
      ignoreNextTableColumnsChange: false // 忽略下次表格列变动
    }
  },
  computed: {
    originStorageKey() {
      const pathStr = this.$utils.transferTF(
        this.$route.fullPath.replace(new RegExp('/', 'gm'), '_')
      )
      const tableName = this.$utils.transferTF(this.tableRef)
      const version = (this.$VERSION_INFO && this.$VERSION_INFO.version) || ''
      return `${tableName}_${this.storageKey}_${pathStr.split('?')[0]}_${version}`
    }
  },
  watch: {
    'extentsProps.table': function () {
      // 表格发生变化，则统计列的最新状态
      this.updateTableColumns()
      this.tableColumns.forEach((column) => {
        if (this.hiddenColumns.includes(column.property)) {
          column.visible = false
          this.updateColumnVisible(column)
        }
      })
      if (!this.hasFirstSearch) {
        this.hasFirstSearch = true
        this.$nextTick(() => {
          this[this.initFunctionName] && this[this.initFunctionName](true)
        })
      }
    },
    'extentsProps.table.store.states.columns': function () {
      // 列发生变化，则统计列的最新状态
      this.updateTableColumns()
    }
  },
  mounted() {
    if (this.getTable() !== undefined) {
      this.attchTable() // 如果 table 未实例化（例如使用了v-if），须在适当时机手动 attchTable 刷新 table 信息
    }
  },
  methods: {
    getTable() {
      return this.$refs[this.tableRef]
    },
    getAllTableColumns() {
      const table = this.getTable()
      if (!table) {
        return { cols: [], refCols: [] }
      }
      const columnFilter = (e) =>
        e && e.type === 'default' && e.property && this.ignoreColumns.indexOf(e.property) === -1
      const refCols = table.columns.filter(columnFilter)
      const fullTableColumns = table.$children
        .map((e) => {
          if (e.columnConfig) {
            e.columnConfig.group = (e.$attrs && e.$attrs.group) || '未分组'
          }
          return e.columnConfig
        })
        .filter(columnFilter)
      return { cols: sortWithRef(fullTableColumns, refCols), refCols }
    },
    getDefaultConfig() {
      const defaultConfigIndex = this.tableStorage.columnConfig.findIndex(
        (item) => item.label === this.defaultConfigLabel
      )
      return defaultConfigIndex >= 0 ? this.tableStorage.columnConfig[defaultConfigIndex] : null
    },
    saveConfigToLocal(newConfigName, columns) {
      const cacheColumnConfig = this.readCacheConfig()
      if (!cacheColumnConfig || !cacheColumnConfig.columnConfig) {
        return
      }
      cacheColumnConfig.columnConfig.push({
        label: newConfigName,
        columns
      })
      this.writeCacheConfig(cacheColumnConfig)
    },
    removeConfigFromLocal(label) {
      const cacheColumnConfig = this.readCacheConfig()
      if (!cacheColumnConfig || !cacheColumnConfig.columnConfig) {
        return
      }
      const deleteIndex = cacheColumnConfig.columnConfig.findIndex((item) => item.label === label)
      if (!deleteIndex) {
        return
      }
      cacheColumnConfig.columnConfig.splice(deleteIndex, 1)
      this.writeCacheConfig(cacheColumnConfig)
    },
    readCacheConfig() {
      try {
        const localKey = this.customStorageKey || this.originStorageKey
        return JSON.parse(window.localStorage.getItem(localKey))
      } catch (e) {
        return null
      }
    },
    writeCacheConfig(config = null) {
      const value = config || this.tableStorage
      const noNameIndex = value.columnConfig.findIndex((item) => item.label === this.noNameLabel)
      if (noNameIndex >= 0) {
        const noNameJson = JSON.stringify(value.columnConfig[noNameIndex].columns)
        const shouldRemoveNoNameConfig = value.columnConfig.find((config) => {
          return config.label !== this.noNameLabel && JSON.stringify(config.columns) === noNameJson
        })
        if (shouldRemoveNoNameConfig) {
          value.columnConfig.splice(noNameIndex, 1)
        }
      }
      const localKey = this.customStorageKey || this.originStorageKey
      window.localStorage.setItem(localKey, JSON.stringify(value))
    },
    existAlreadyWithSystem(label) {
      return this.systemConfigLabel.includes(label)
    },
    updateProp(name, value) {
      // 扩展状态数据到data中
      this.$set(this.extentsProps, name, value)
    },
    async attchTable() {
      // 挂载 table 到 data 中
      const table = this.getTable()
      this.updateProp('table', table)
    },
    updateTableColumns() {
      // 统计列的最新状态
      if (this.ignoreNextTableColumnsChange) {
        this.ignoreNextTableColumnsChange = false
        return
      }
      this.ignoreNextTableColumnsChange = false

      const defaultConfig = this.getDefaultConfig()
      const columns = []
      const { cols, refCols } = this.getAllTableColumns()
      cols.forEach((col) => {
        const column = {
          property: col.property,
          label: col.label,
          fixed: !!col.fixed,
          group: col.group,
          visible: refCols.indexOf(col) !== -1
        }
        if (this.needDefaultInit && defaultConfig && defaultConfig.columns) {
          defaultConfig.columns.push(col.property)
        }
        columns.push(column)
      })
      this.dealMixinConfig(columns)
      this.dealCacheConfig(columns)
      this.needDefaultInit = false
      this.tableColumns = columns
    },
    dealMixinConfig(columns) {
      if (!this.columnConfig || !this.columnConfig.length) {
        return
      }
      const defaultConfig = this.getDefaultConfig()
      this.columnConfig.forEach((mixinColumnConfig) => {
        if (
          mixinColumnConfig.label === this.defaultConfigLabel &&
          mixinColumnConfig.columns &&
          mixinColumnConfig.columns.length &&
          !mixinColumnConfig.columns.includes('ALL')
        ) {
          defaultConfig.columns = [...mixinColumnConfig.columns]
        } else {
          this.systemConfigLabel.push(mixinColumnConfig.label)
          this.tableStorage.columnConfig.push({
            label: mixinColumnConfig.label,
            columns:
              mixinColumnConfig.columns &&
              mixinColumnConfig.columns.length &&
              !mixinColumnConfig.columns.includes('ALL')
                ? [...mixinColumnConfig.columns]
                : columns.map((each) => each.property)
          })
        }
      })
    },
    dealCacheConfig(columns) {
      if (!this.needDefaultInit) {
        return
      }
      const cacheColumnConfig = this.readCacheConfig()
      if (!cacheColumnConfig) {
        this.writeCacheConfig()
      } else {
        const { activeColumnConfigLabel, columnConfig } = cacheColumnConfig
        this.tableStorage.activeColumnConfigLabel =
          activeColumnConfigLabel || this.tableStorage.activeColumnConfigLabel
        this.dealLabelChange(this.tableStorage.activeColumnConfigLabel)
        columnConfig &&
          columnConfig.forEach((each) => {
            if (!this.existAlreadyWithSystem(each.label)) {
              this.tableStorage.columnConfig.push({
                label: each.label,
                columns: [...each.columns]
              })
            }
          })
      }
      const initColumnConfig = this.tableStorage.columnConfig.find(
        (one) => one.label === this.tableStorage.activeColumnConfigLabel
      )
      if (initColumnConfig) {
        this.hiddenColumns = []
        columns.forEach((column) => {
          if (!initColumnConfig.columns.includes(column.property)) {
            this.hiddenColumns.push(column.property)
          }
        })
      }
    },
    updateColumnVisible(item) {
      // 更新列的可视化
      const table = this.getTable()
      const vm = table.$children.find((e) => e.prop === item.property)
      const columnConfig = vm.columnConfig
      if (item.visible) {
        // 找出合适的插入点
        const columnIndex = table.$children.findIndex((e) => e.prop === item.property)
        vm.owner.store.commit('insertColumn', columnConfig, columnIndex, null)
      } else {
        vm.owner.store.commit('removeColumn', columnConfig, null)
      }
      this.ignoreNextTableColumnsChange = true
    },
    applpyColumnConfig(config) {
      // 应用配置的逻辑
      if (!config || !config.label || !this.tableColumns.length) {
        return
      }
      if (!config.columns || !config.columns.length || config.columns.includes('ALL')) {
        return this.applpyColumnConfig({
          label: config.label,
          columns: this.tableColumns.map((each) => each.property)
        })
      }
      const { label, columns } = config
      const cacheColumnConfig = this.readCacheConfig()
      if (cacheColumnConfig) {
        cacheColumnConfig.activeColumnConfigLabel = label
        this.dealLabelChange(cacheColumnConfig.activeColumnConfigLabel)
        const existIndex = cacheColumnConfig.columnConfig.findIndex((one) => one.label === label)
        if (existIndex === -1) {
          cacheColumnConfig.columnConfig.push(config)
        }
        if (existIndex !== -1 && label === this.noNameLabel) {
          const noNameIndex = cacheColumnConfig.columnConfig.findIndex(
            (con) => con.label === this.noNameLabel
          )
          cacheColumnConfig.columnConfig[noNameIndex].columns = [...config.columns]
        }
        this.writeCacheConfig(cacheColumnConfig)
      }
      this.tableColumns.forEach((column) => {
        if (!column.visible && columns.includes(column.property)) {
          column.visible = true
          this.updateColumnVisible(column)
        } else if (column.visible && !columns.includes(column.property)) {
          column.visible = false
          this.updateColumnVisible(column)
        }
      })
    },
    applyColumnByLabel(labels) {
      const labelName = labels && labels.length === 1 ? labels[0] : this.defaultConfigLabel
      const idx = this.tableStorage.columnConfig.findIndex((item) => item.label === labelName)
      if (idx >= 0) {
        const cfg = this.tableStorage.columnConfig[idx]
        this.applpyColumnConfig(cfg)
      }
    },
    dealLabelChange(label) {
      if (this.activeLabelChange) {
        this.activeLabelChange(label)
      } else {
        this.$emit('label-change', label)
      }
    }
  }
}
