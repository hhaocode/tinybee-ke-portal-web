import http from '@/utils/http'

const baseApi = '/api/open/base'

export function categoryTree () {
  return http.get(`${baseApi}/categoryTree`)
}

export function categorys () {
  return http.get(`${baseApi}/categorys`)
}

export function classifyTree () {
  return http.get(`${baseApi}/classifyTree`)
}
