/**
 * 全局组件
 */
import Vue from 'vue'

import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// 手动引入 ECharts 各模块来减小打包体积.
// 模块名称详见： https://github.com/apache/echarts/blob/master/src/echarts.all.ts
import { CanvasRenderer } from 'echarts/renderers'

import { LineChart, BarChart } from 'echarts/charts'

import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

import doCopy from './doCopy'
import doPreview from './doPreview'
import DoTableHeader from './doTable/DoTableHeader.vue'
import TableWrap from './doTable/TableWrap.vue'
import AccountPhoto from './AccountPhoto.vue'
import ClientUserSelect from './ClientUserSelect.vue'
import CollectionSelect from './CollectionSelect.vue'
import DoFilterPanel from './DoFilterPanel.vue'
import DoNumberSetter from './DoNumberSetter.vue'
import DoQuil from './DoQuil.vue'
import DoSaying from './DoSaying.vue'
import DoTextSetter from './DoTextSetter.vue'
import DateRange from './DateRange.vue'
import DoColorPicker from './DoColorPicker.vue'
import DoFileList from './DoFileList.vue'
import DoFileUpload from './DoFileUpload.vue'
import DoUpload from './DoUpload.vue'
import multipleLang from './multipleLang.vue'
import RegionSelect from './RegionSelect.vue'
import SingleFileUpload from './SingleFileUpload.vue'
import doUpload from './upload.vue'
import SubCateSelect from './SubCateSelect.vue'
import TopCateSelect from './TopCateSelect.vue'

Vue.component('DoTableHeader', DoTableHeader)
Vue.component('TableWrap', TableWrap)
Vue.component('AccountPhoto', AccountPhoto)
Vue.component('ClientUserSelect', ClientUserSelect)
Vue.component('CollectionSelect', CollectionSelect)
Vue.component('DoColorPicker', DoColorPicker)
Vue.component('DoFileList', DoFileList)
Vue.component('DoFileUpload', DoFileUpload)
Vue.component('DoUpload', DoUpload)
Vue.component('DoFilterPanel', DoFilterPanel)
Vue.component('DoNumberSetter', DoNumberSetter)
Vue.component('DoQuil', DoQuil)
Vue.component('DoSaying', DoSaying)
Vue.component('DoTextSetter', DoTextSetter)
Vue.component('DateRange', DateRange)

Vue.component('MultipleLang', multipleLang)
Vue.component('RegionSelect', RegionSelect)
Vue.component('SingleFileUpload', SingleFileUpload)
Vue.component('SubCateSelect', SubCateSelect)
Vue.component('TopCateSelect', TopCateSelect)
Vue.component('Upload', doUpload)

Vue.component('ECharts', ECharts)
use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent])
Vue.use(doCopy)
Vue.use(doPreview)
