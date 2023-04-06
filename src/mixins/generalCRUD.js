import BasePagination from '@/components/BasePagination.vue'

export default {
  components: {
    BasePagination
  },
  data() {
    return {
      tableLoading: false,
      query: {
        curPage: 1,
        pageSize: this?.$store?.state?.pageSize || 10
      },
      total: 0,
      tableData: []
    }
  },
  methods: {
    handlePnChange(pn) {
      this.query.curPage = pn
      this.search && this.search()
    },
    handleSizeChange(size) {
      this.query.pageSize = size
      this.$store.dispatch('setPageSize', size).then(() => {})
      this.search && this.search(true)
    },
    handleSortChange({ prop, order, column }) {
      const _order = (order || '').replace(/ending$/, '')
      if (column.sortable === 'custom') {
        this.query.orderBy = order ? prop : ''
        this.query.seq = _order
        this.search(true)
      }
    }
  }
}
