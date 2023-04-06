import common from './modules/common'
import area from './modules/area'
import * as aside from './modules/aside'
import city from './modules/city'
import color from './modules/color'
import language from './modules/language'
import permission from './modules/permission'
import region from './modules/region'
import upload from './modules/upload'

import client from '@/modules/clientManage/_maps'
import paper from '@/modules/contentManage/_maps/paper'
import collection from '@/modules/operateManage/_maps/collection'
import topCate from '@/modules/operateManage/_maps/topCate'
import subCate from '@/modules/operateManage/_maps/subCate'
import system from '@/modules/systemManage/_maps'

const maps = {
  common,
  area,
  aside,
  city,
  color,
  language,
  permission,
  region,
  upload,

  client,
  paper,

  collection,
  topCate,
  subCate,

  system
}

export default maps
