import http from '@/utils/http'

export function join (courseId) {
  return http.post(`/api/ums/user-course/join/${courseId}`)
}

export function userCourseInfo (courseId) {
  return http.get(`/api/ums/user-course/info/${courseId}`)
}

export function computeOrder (courseId) {
  return http.get(`/api/order/compute/${courseId}`)
}
