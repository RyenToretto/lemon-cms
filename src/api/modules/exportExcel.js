import convertTimeRange from '@/utils/module/convertTimeRange'
import deepClone from '@/utils/module/deepClone'

export const wallpaperExportExcel = (originParams) => {
  const params = convertTimeRange(deepClone(originParams))
  delete params.type
  return window.axios.get('/image/export', { params, responseType: 'blob' })
}

// 分成数据接口
export const profitExportExcel = (originParams) => {
  const params = convertTimeRange(deepClone(originParams))
  return window.axios.get('/profit/export', { params, responseType: 'blob' })
}
