import { request } from "./request"

export function daily_signin() {
  return request({
    url: "/daily_signin",
    params: {
      cookie: sessionStorage.getItem('cookie')
    }
  })
}