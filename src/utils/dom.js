export function appendLink (href) {
  const link = document.createElement('link')
  link.href = href
  link.rel = 'stylesheet'
  document.querySelector('head').appendChild(link)
}

export function appendScript (src, onload) {
  const script = document.createElement('script')
  script.src = src
  document.body.appendChild(script)
  script.onload = function () {
    onload()
  }
}

export function hasClass (el, className) {
  if (!className.replace(/\s/g, '').length) return false
  return new RegExp(' ' + className + ' ').test(' ' + el.className + ' ')
}
export function getStyle (el) {
  return el.currentStyle ? el.currentStyle : window.getComputedStyle(el)
}
