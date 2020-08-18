import { request } from "./request"

export function getHotSearch() {
  return request({
    url: '/search/hot/detail'
  })
}

export function getMultimatch(keywords) {
  return request({
    url: '/search/multimatch',
    data: {
      keywords
    },
    method: 'post'
  })
}

export function getSearchDefault() {
  return request({
    url: '/search/default'
  })
}

export function getSearchSuggest(keywords) {
  return request({
    url: '/search/suggest',
    data: {
      keywords,
      // type: 'mobile'
    },
    method: 'post'
  })
}

export function getSearchData(keywords) {
  return request({
    url: '/search',
    data: {
      keywords,
    },
    method: 'post'
  })
}