import Vue from 'vue'

// import Element from 'element-ui'
// import '@/styles/element-variables.scss'
import '@/styles/ui.scss'
import '@/assets/icons'
import '@/assets/font-awesome-4.7.0/scss/font-awesome.scss'

import VueVideoPlayer from 'vue-video-player'
import hls from 'videojs-contrib-hls'

import ArcusHeader from '@/components/common/ArcusHeader'

import GeminiScrollbar from 'vue-gemini-scrollbar'

import Pagination from './pagination'
import Tabs from './tabs'
import TabPane from './tab-pane'
import Message from './message'
import Dialog from './dialog'
import Http from '@/utils/http'

import NoData from '@/components/common/NoData'

import '@/filters'

Vue.prototype.$http = Http
Vue.prototype.$get = Http.get
Vue.prototype.$post = Http.post
Vue.prototype.$put = Http.put

Vue.use(hls)

Vue.use(VueVideoPlayer)
// Vue.use(hls)

Vue.use(GeminiScrollbar)
// Vue.use(Element)

Vue.component(ArcusHeader)
Vue.component(NoData.name, NoData)

Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Message)
Vue.use(Dialog)

// var scrollbar = new Vue.$geminiScrollbar({
//   element: document.body
// }).create()

// console.log('scrollbar: ', scrollbar)
