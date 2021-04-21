import Vue from 'vue'
import Main from './main.vue'

let instance
const instances = []
let seed = 1
const types = ['success', 'warning', 'info', 'error']

const MessageConstructor = Vue.extend(Main)
const Message = function (options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  const id = 'message_' + seed++
  options.onClose = function () {
    Message.close(id)
  }
  instance = new MessageConstructor({
    data: options
  })
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  instances.push(instance)
  return instance
}

Message.close = function (id) {
  const len = instances.length
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      instances.splice(i, 1)
      break
    }
  }
  // 上
}

types.forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

export default Message
