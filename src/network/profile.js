import { request } from "./request"

export function getPlaylist(uid) {
  return request({
    url: "/user/playlist",
    params: {
      uid
    }
  })
}

export function getPersonal_fm(cookie) {
  return request({
    url: "/personal_fm",
    params: {
      // cookie
    }
  })
}

export function getRecord(uid, type) {
  return request({
    url: "/user/record",
    params: {
      uid,
      type
    }
  })
}

export function getDigitalAlbum(cookie, limit) {
  return request({
    url: "/digitalAlbum/purchased",
    params: {
      // cookie,
      limit
    }
  })
}


