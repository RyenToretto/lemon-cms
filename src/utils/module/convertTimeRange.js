import deepClone from './deepClone'

const convertTimeRange = (params) => {
  if (!params) {
    return params
  }

  const newParams = deepClone(
    {
      ...params,
      startTime: (params.timeRange && params.timeRange[0]) || '',
      endTime: (params.timeRange && params.timeRange[1]) || ''
    },
    true
  )

  delete newParams.timeRange
  return newParams
}

export default convertTimeRange
