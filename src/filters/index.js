import Vue from 'vue'

Vue.filter('amount', function (value) {
  if (!value) {
    return '0.00'
  }
  var num = Number(value)
  return num.toFixed(2)
})
