import Dropdown from './src/main'
import directive from './src/directive'
import Vue from 'vue'

Vue.directive('dropdown', directive)

/* istanbul ignore next */
Dropdown.install = function (Vue) {
  Vue.directive('popover', directive)
  Vue.component(Dropdown.name, Dropdown)
}
Dropdown.directive = directive

export default Dropdown
