import { resolve } from 'path'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

const alias = [
  // @/xxxx => src/xxxx
  {
    find: '@/',
    replacement: `${pathResolve('src')}/`
  },
  // /#/xxxx => types/xxxx
  {
    find: /\/#\//,
    replacement: `${pathResolve('types')}/`
  }
]

export default alias
