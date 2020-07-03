import { request } from "./request";

export function getRankData() {
  return request({
    url: "/toplist/detail"
  })
}

export function getRankDetail(id) {
  return request({
    url: "/top/list",
    params: {
      id
    }
  })
}