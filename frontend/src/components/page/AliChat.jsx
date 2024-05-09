import React, { useEffect, useRef } from 'react'
import '@chatui/core/es/styles/index.less'
// 引入组件
// import Chat, { Bubble, useMessages } from '@chatui/core'
// 引入样式
import '@chatui/core/dist/index.css'
// 引入定制的样式
import '../../assets/css/chatui-theme.css'

export default function AliChat() {
  const wrapper = useRef()

  useEffect(() => {
    const bot = new window.ChatSDK({
      root: wrapper.current,
      config: {
        navbar: {
          title: '辅助创作',
        },
        brand: {},
        robot: {
          /*  avatar: '//gw.alicdn.com/tfs/TB1U7FBiAT2gK0jSZPcXXcKkpXa-108-108.jpg', */
        },
        messages: [
          {
            type: 'text',
            content: {
              text: '智能创作助手助理为您服务，请问有什么可以帮您？',
            },
          },
        ],
        // 快捷短语
        quickReplies: [
          { name: '今日热点' },
          { name: '扩写' },
          { name: '续写' },
          { name: '总结一下' },
        ],
        // 输入框占位符
        placeholder: '请输入您的问题',
        // 侧边栏
        sidebar: [
          {
            code: 'sidebar-suggestion',
            data: [
              {
                label: '疫情问题',
                list: [
                  '身边有刚从湖北来的人，如何报备',
                  '接触过武汉人，如何处理？',
                  '发烧或咳嗽怎么办？',
                  '去医院就医时注意事项',
                  '个人防护',
                  '传播途径',
                  '在家消毒',
                ],
              },
              {
                label: '法人问题',
                list: [
                  '企业设立',
                  '企业运行',
                  '企业变更',
                  '企业服务',
                  '企业注销',
                  '社会团体',
                  '民办非企业',
                ],
              },
            ],
          },
          {
            code: 'sidebar-tool',
            title: '常用工具',
            data: [
              {
                name: '咨询表单',
                icon: 'clipboard-list',
                url: 'http://www.zjzxts.gov.cn/wsdt.do?method=suggest&xjlb=0&ymfl=1&uflag=1',
              },
              {
                name: '投诉举报',
                icon: 'exclamation-shield',
                url: 'http://www.zjzxts.gov.cn/wsdt.do?method=suggest&xjlb=1',
              },
              {
                name: '办事进度',
                icon: 'history',
                url: 'http://www.zjzwfw.gov.cn/zjzw/search/progress/query.do?webId=1',
              },
            ],
          },
          {
            code: 'sidebar-phone',
            title: '全省统一政务服务热线',
            data: ['12345'],
          },
        ],
        feedback: {
          // 点赞后出的文本
          textOfGood: '感谢您的评价，我们会继续努力的哦！',
          // 点踩后出的文本
          textOfBad: '',
          // 点踩后是否显示反馈表单
          needFeedback: true,
          // 不满意原因列表
          options: [
            {
              // 选项值
              value: '我没有得到我想要的答案',
              // 选项显示文本，当与 value 相同时可省略
              label: '我没有得到我想要的答案',
            },
            {
              value: '界面太难用了',
            },
            {
              value: '我不认可这个规则',
            },
          ],
          // 原因是否必选
          isReasonRequired: true,
          // 提交反馈后出的文本
          textAfterSubmit: '',
        },
      },
      requests: {
        /* ... */
        send: function (msg) {
          const data = msg.content

          // 发送文本消息时
          if (msg.type === 'text') {
            return {
              url: '/xiaomi/ask.do',
              data: {
                q: data.text,
              },
            }
          }
          // ... 其它消息类型的处理

          // 当需要增加header或者websocket、sse等特殊形式消息处理时，可以返回Promise，假如返回Promise对象是空对象，则不会展示消息内容
        },
      },
      handlers: {
        /* ... */
        parseResponse: function (res, requestType) {
          // 根据 requestType 处理数据
          if (requestType === 'send' && res.Messages) {
            // 用 isv 消息解析器处理数据
            return { data: res }
          }

          // 不需要处理的数据直接返回
          return res
        },
      },
    })

    bot.run()
  }, [])

  // 注意 wrapper 的高度
  return <div style={{ height: '100%' }} ref={wrapper} />
}
