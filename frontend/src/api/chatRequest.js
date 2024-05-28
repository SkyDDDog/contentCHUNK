import requset from './config'
export const chat = (query) => {
  return fetch(`http://127.0.0.1:10088/chat?query=${query}`)
}
/*
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error))
*/

export const chatWithTools = (chatId, query) => {
  return requset({
    method: 'post',
    url: `/ai-service/ai/chat/tool/${chatId}`,
    data: {
      input: query,
    },
  })
}
