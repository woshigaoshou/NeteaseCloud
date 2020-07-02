import { request } from "./request"

export function getBanner(type) {
  return request({
    url: "banner",
    data: {
      type
    },
    method: 'post'
  })
}

export function getSongUrl(ids) {

  return request({
    url: "/song/url",
    params: {
      id: ids.join(",")
    }
  })
}

