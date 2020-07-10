import { request } from "./request"

export function login(phone, password) {
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      password
    },
    method: 'get'
  })
}

export function checkIdentify(phone, captcha) {
  return request({
    url: '/captcha/verify',
    data: {
      phone,
      captcha
    },
    method: 'post'
  })
}

export function register(data) {
  // console.log(data);
  return request({
    url: '/register/cellphone',
    data: {
      phone: data.phone,
      password: data.password,
      captcha: data.captcha,
      nickname: data.nickname
    },
    method: 'post'
  })
}

export function checkPhoneNum(phone) {
  return request({
    url: '/cellphone/existence/check',
    data: {
      phone
    },
    method: 'post'
  })
}

export function getIdentify(phone) {
  return request({
    url: '/captcha/sent',
    data: {
      phone
    },
    method: 'post'
  })
}
