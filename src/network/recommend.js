import { request } from "./request"

export function getRecommendResource() {
  return request({
    url: "/recommend/resource",
    data: {
      cookie: sessionStorage.getItem('cookie')
    },
    method: 'post'
  })
}

export function getRecommendSongs() {
  return request({
    url: '/recommend/songs',
    data: {
      cookie: sessionStorage.getItem('cookie')
    },
    method: 'post'
  })
}

export function getRecommendMV() {
  return request({
    url: '/personalized/mv'
  })
}

export function getRecommendDjprogram() {
  return request({
    url: '/personalized/djprogram'
  })
}

export function getMvData(id) {
  return request({
    url: '/mv/url',
    params: {
      id
    }
  })
}