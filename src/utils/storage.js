const SEARCH_HISTORY_KEY = 'SEARCH_HISTORY_KEY'

export function setItem (key, obj) {
  localStorage.setItem(key, JSON.stringify(obj))
}

export function getItem (key) {
  const res = localStorage.getItem(key)
  if (!res) {
    return null
  }
  return JSON.parse(res)
}

export function removeItem (key) {
  localStorage.removeItem(key)
}

export function clear () {
  localStorage.clear()
}

export function addSearchHistory (item) {
  const res = getSearchHistory()
  res.push(item)
  setItem(SEARCH_HISTORY_KEY, res)
}

export function getSearchHistory () {
  return getItem(SEARCH_HISTORY_KEY) || []
}
