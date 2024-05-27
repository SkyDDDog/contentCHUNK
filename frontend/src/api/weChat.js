import axios from 'axios'
import request from './config'

export const PublishPage = (userId, pageData) => {
  return request({
    url: `/wechat-service/publish/publish?userId=${userId}`,
    method: 'post',
    data: pageData,
    timeout: 7000,
  })
}

export const GetPublishState = function (userId, publishId) {
  return request({
    url: `/wechat-service/publish/${publishId}?userId=${userId}`,
  })
}

export const GetSuccessPublishedHistory = function (userId) {
  return request({
    url: `/wechat-service/publish/history?userId=${userId}`,
  })
}

export const UploadFileToWx = (userId, file) => {
  return axios.post(
    `http://123.249.33.39:10001/wechat-service/publish/upload?userId=${userId}`,
    file,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}
