import http from '@/utils/http'

const baseApi = '/api/open/web/cms'

export function page (params) {
  return http.get(`${baseApi}/course/page`, { params })
}

export function detail (id) {
  return http.get(`${baseApi}/detail/${id}`)
}

export function chapters (params) {
  return http.get(`${baseApi}/chapters/${params.id}`, { params: { requireVod: params.requireVod } })
}
