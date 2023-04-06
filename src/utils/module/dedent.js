export default function dedent(strings) {
  // eslint-disable-next-line no-void
  let raw = void 0
  if (typeof strings === 'string') {
    // dedent can be used as a plain function
    raw = [strings]
  } else {
    raw = strings.raw
  }

  // first, perform interpolation
  let result = ''
  for (let i = 0; i < raw.length; i++) {
    result += raw[i]
      // join lines when there is a suppressed newline
      .replace(/\\\n[ \t]*/g, '')

      // handle escaped backticks
      .replace(/\\`/g, '`')

    if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
      result += arguments.length <= i + 1 ? undefined : arguments[i + 1]
    }
  }

  // now strip indentation
  const lines = result.split('\n')
  let mindent = null
  lines.forEach(function (l) {
    const m = l.match(/^(\s+)\S+/)
    if (m) {
      const indent = m[1].length
      if (!mindent) {
        // this is the first indented line
        mindent = indent
      } else {
        mindent = Math.min(mindent, indent)
      }
    }
  })

  if (mindent !== null) {
    result = lines
      .map(function (l) {
        return l[0] === ' ' ? l.slice(mindent) : l
      })
      .join('\n')
  }

  result = result.trim()

  return result.replace(/\\n/g, '\n')
}
