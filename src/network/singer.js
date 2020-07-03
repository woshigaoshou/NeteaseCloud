import { request } from "./request"

export function gethotSinger(offset, limit) {
  return request({
    url: "/top/artists",
    params: {
      offset,
      limit
    }
  })
}

export function getRegionSinger(type) {
  return request({
    url: "/toplist/artist",
    params: {
      type
    }
  })
}

export function getSingerInfo(id) {
  return request({
    url: "/artists",
    params: {
      id
    }
  })
}
