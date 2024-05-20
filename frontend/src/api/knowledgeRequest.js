import request from './config'

export const GetKnowLedgeList = (userId) => {
  return request({
    url: `/knowledge-service/knowledge/${userId}`,
    method: 'get',
  })
}

export const GetPagesByKnowLedgeId = (knowledgeId) => {
  return request({
    url: `/knowledge-service/page/${knowledgeId}`,
    method: 'get',
  })
}

/* 更新知识库目录 */
export const UpdateKnowledgeByUserId = (userId,data) => {
  return request({
    url: `/knowledge-service/knowledge/${userId}`,
    method:'post',
    data
  })
}

/* 根据pageId获取内容 */
export const GetPageContentById = (pageId) => {
  return request({
    url: `/knowledge-service/page/detail/${pageId}`,
  })
}


