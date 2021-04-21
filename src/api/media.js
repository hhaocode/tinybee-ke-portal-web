import http from '@/utils/http'

export function getVodPlayAuth (vid) {
  return http.get(`/api/cms-media/getVodPlayAuth/${vid}`)
}
