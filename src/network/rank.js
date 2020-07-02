import { request } from "./request";

export function getRankData() {
  return request({
    url: "/toplist/detail"
  })
}