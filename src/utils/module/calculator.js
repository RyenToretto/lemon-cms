const getPointPow = (num1, num2, config = {}) => {
  let pointLength1 = 0
  let pointLength2 = 0
  if ((num1 + '').indexOf('.') >= 0) {
    // 如果存在小数点
    pointLength1 = (num1 + '').split('.')[1].length
  }

  if ((num2 + '').indexOf('.') >= 0) {
    // 如果存在小数点
    pointLength2 = (num2 + '').split('.')[1].length
  }
  let pL = Math.max(pointLength1, pointLength2)
  if (config.isMul) {
    pL = pointLength1 + pointLength2
  }
  return Math.pow(10, pL)
}

const calculator = {
  fAdd: (num1, num2) => {
    // 加法
    const pow = getPointPow(num1, num2)
    return (calculator.fMul(num1, pow) + calculator.fMul(num2, pow)) / pow
  },
  fSub: (num1, num2) => {
    // 减法
    const pow = getPointPow(num1, num2)
    return (calculator.fMul(num1, pow) - calculator.fMul(num2, pow)) / pow
  },
  fMul: (num1, num2) => {
    // 乘法
    const pow = getPointPow(num1, num2, { isMul: true })
    const s1 = num1.toString()
    const s2 = num2.toString()
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / pow
  },
  fDiv: (num1, num2) => {
    // 除法
    const pow = getPointPow(num1, num2)
    return calculator.fMul(num1, pow) / calculator.fMul(num2, pow)
  }
}

export default calculator
