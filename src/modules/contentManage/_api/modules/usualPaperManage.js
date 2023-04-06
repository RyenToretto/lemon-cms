import { doImageToStringArray } from '@/utils/module/helpers'

export const requestUsualPaperList = ({
  type,
  userId, // 作者
  downloadType, // 属性
  subcategoryIds, // 二级分类
  status, // 状态
  source, // 来源
  isRecommend, // 精选

  seq,
  orderBy,
  curPage,
  pageSize
}) => {
  return window.axios.get('/content/list', {
    params: {
      type,
      userId, // 作者
      downloadType, // 属性
      subcategoryIds, // 二级分类
      status, // 状态
      source, // 来源
      isRecommend, // 精选

      seq,
      orderBy,
      curPage,
      pageSize
    }
  })
}

export const requestAddUsualPaper = ({
  type,
  imageUrls,
  source,
  userId,
  categoryId,
  subcategoryIds,
  collectionId,
  isVip,
  isAd,
  isRecommend
}) => {
  return window.axios.post('/content/add', {
    type,
    imageUrls: doImageToStringArray(imageUrls),
    source,
    userId,
    categoryId,
    subcategoryIds,
    collectionId,
    isVip,
    isAd,
    isRecommend
  })
}

export const requestUpdateUsualPaper = ({
  id,
  type,
  imageUrl,
  source,
  userId,
  categoryId,
  subcategoryIds,
  collectionId,
  isVip,
  isAd,
  isRecommend
}) => {
  return window.axios.post('/content/update', {
    id,
    type,
    imageUrl,
    source,
    userId,
    categoryId,
    subcategoryIds,
    collectionId,
    isVip,
    isAd,
    isRecommend
  })
}

export const requestDeleteUsualPaper = (ids) => {
  return window.axios.post('/content/delete', { ids })
}

export const requestSwitchUsualPaper = (ids, status) => {
  return window.axios.post('/content/status', { ids, status })
}

export const requestChangeUsualPaperProperty = ({ ids, isAd, isVip }) => {
  // 属性
  return window.axios.post('/content/downloadType', { ids, isAd, isVip })
}

export const requestBatchRecommend = ({ ids, isRecommend }) => {
  return window.axios.post('/content/recommend', { ids, isRecommend })
}

export const requestBatchClientUser = ({ ids, userId }) => {
  return window.axios.post('/content/user', { ids, userId })
}

export const requestBatchCollection = ({ ids, collectionId }) => {
  return window.axios.post('/content/collection', { ids, collectionId })
}

export const requestBatchCate = ({ ids, categoryId, subcategoryIds }) => {
  return window.axios.post('/content/category', { ids, categoryId, subcategoryIds })
}
