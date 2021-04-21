import http from '@/utils/http'

export function register (param) {
  return http.post('/api/auth/register', param)
}

export function login (param) {
  return http.post('/api/auth/login', param)
}

export function getCacheUser () {
  return http.get('/api/auth/cache-user')
}

export function logout () {
  return http.get('/api/auth/logout')
}
