import getRealType from './getRealType'

const sortArrayByDateField = (objectArr, field, descending = false) => {
  if (getRealType(objectArr) === 'array') {
    return objectArr.sort((a, b) => {
      const value1 = field ? a[field] : a
      const value2 = field ? b[field] : b
      if (descending) {
        // 降序
        return Date.parse(value2) - Date.parse(value1)
      } else {
        // 升序
        return Date.parse(value1) - Date.parse(value2)
      }
    })
  }
  return objectArr
}

export default sortArrayByDateField
