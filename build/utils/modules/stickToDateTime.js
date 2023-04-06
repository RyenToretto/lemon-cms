export const stickToDateTime = (str, format = 'dateTime') => {
  const date = new Date(str)
  let dateStr = ''
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  if (new Date(date).toString() === 'Invalid Date' || !str) {
    return ''
  }
  month < 10 && (month = '0' + month)
  day < 10 && (day = '0' + day)
  hour < 10 && (hour = '0' + hour)
  minute < 10 && (minute = '0' + minute)
  second < 10 && (second = '0' + second)
  switch (format) {
    case 'dateTime':
      dateStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      break
    default:
      dateStr = `${year}-${month}-${day}`
  }
  return dateStr
}
