import React, { useEffect, useRef, useState } from 'react'
import '@chatui/core/es/styles/index.less'
// 引入组件
// import Chat, { Bubble, useMessages } from '@chatui/core'
// 引入样式
import '@chatui/core/dist/index.css'
// 引入定制的样式
import '../../assets/css/chatui-theme.css'
/* redux */
import { useDispatch, useSelector } from 'react-redux'
import {
  setBoxWidth,
  setChatExpended,
  setEditorAddedContent,
} from '../../redux/chat'
let ctx
export default function AliChat() {
  const wrapper = useRef()

  /* redux */
  const dispatch = useDispatch()
  const selectedText = useSelector((state) => state.chat.selectedText)
  let [contentToAdd, setContentToAdd] = useState('')
  useEffect(() => {
    const bot = new window.ChatSDK({
      root: wrapper.current,
      components: {
        // 推荐主动指定 name 属性
        'adaptable-action-card': {
          name: 'AlimeComponentAdaptableActionCard',
          url: '//g.alicdn.com/alime-components/adaptable-action-card/0.1.7/index.js',
        },
      },
      config: {
        navbar: {
          title: (
            <div style={{ display: 'flex', position: 'relative' }}>
              <div>辅助创作</div>
            </div>
          ),
          rightContent: [
            {
              icon: 'close',
              onClick: () => {
                console.log('关闭')
                dispatch(setChatExpended(false))
                setBoxWidth(0)
              },
            },
          ],
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
          console.log(msg)
          // 发送文本消息时
          if (msg.type === 'text') {
            return {
              _id: '1',
              type: 'card',
              content: {
                code: 'knowledge',
                data: {
                  text: '...',
                },
              },
              meta: {
                evaluable: true, // 是否展示点赞点踩按钮
              },
            }
            // ... 其它消息类型的处理

            // 当需要增加header或者websocket、sse等特殊形式消息处理时，可以返回Promise，假如返回Promise对象是空对象，则不会展示消息内容
          }
        },

        evaluate() {
          /*  return {
            _id: '1',
            type: 'text',
            content: {
              text: '感谢您的评价，我们会继续努力的哦！',
            },
          } */
        },
      },
      handlers: {
        /* ... */
        parseResponse: function (res, requestType) {
          console.log('res', res, requestType)
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
    // 获取 ctx 对象
    ctx = bot.getCtx()
  }, [])

  /* 事件委托,绑定点击应用的事件 */
  useEffect(() => {
    const messageListDOM = document.querySelector('.MessageList')
    console.log('messageListDOM', messageListDOM)
    // 定义事件处理函数
    function handleClick(event) {
      // 检查事件目标是否是你想要的类名
      if (
        event.target.classList.contains('Btn') &&
        event.target.textContent == '应用'
      ) {
        console.log('dispatch setEditorAddedContent', contentToAdd)
        /* 派发，告诉Editor添加 */
        dispatch(setEditorAddedContent({ contentToAdd }))
      }
    }

    // 在父元素上添加事件监听器，实现事件委托
    messageListDOM.addEventListener('click', handleClick)

    // 返回一个清理函数，在组件销毁时移除事件监听器
    return () => {
      messageListDOM.removeEventListener('click', handleClick)
    }
  }, [contentToAdd])

  /* 生成了需要添加的内容后，将其插入卡片 */
  useEffect(() => {
    if (!contentToAdd) return
    ctx.appendMessage({
      type: 'card',
      content: {
        code: 'adaptable-action-card', // 卡片code
        data: {
          title: '扩写结果',
          // picUrl:
          //   'https://gw.alicdn.com/tfs/TB1FwxTGxnaK1RjSZFtXXbC2VXa-1200-800.jpg',
          content: contentToAdd,
          actionList: [
            {
              text: '应用',
              action: '',
              style: 'default',
              param: {
                /* url: 'https://www.taobao.com', */
              },
            },
            {
              text: '重写',
              action: 'sendText',
              style: 'default',
              param: {
                text: '重新生成中',
              },
            },
          ],
        }, // 卡片数据
      },
    })
  }, [contentToAdd])

  /* 监听是否有选中的内容(点击扩写会改变) */
  useEffect(() => {
    if (selectedText) {
      /* 插入Chat */
      ctx.appendMessage({
        type: 'text',
        content: {
          text: selectedText,
        },
        position: 'right',
      })

      /* 扩写 */
      /* 模拟获取扩写的结果 */
      console.log('setContentTOadd hereherehere')
      setContentToAdd(
        Math.random() +
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatibus pariatur numquam reiciendis enim ab, odio placeat dolorum error, officia porro vitae aut nobis nulla asperiores omnis minima nesciunt. Corporis?',
      )
    }
  }, [selectedText]) /* 到时候这里改成扩写的Flag */

  // 注意 wrapper 的高度
  return <div style={{ height: '100%' }} ref={wrapper} />
}
