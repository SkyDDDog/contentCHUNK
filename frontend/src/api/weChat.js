import request from './config'

export const PublishPage = (userId, pageData) => {
  return request({
    url: `/wechat-service/publish/publish?userId=${userId}`,
    method: 'post',
    data: pageData,
  })
}

export const GetPublishState = function (userId, publishId) {
  return request({
    url: `/wechat-service/publish/${publishId}?userId=${userId}`,
  })
}
