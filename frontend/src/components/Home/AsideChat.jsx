import React, { useEffect, useRef, useState } from 'react'
import { Sidebar /*  SidebarSection, NavItem  */ } from '@saas-ui/react'
// import Chat from '../page/Chat'
import AliChat from '../page/AliChat.jsx'
import { ResizeBox } from '../../saas-ui-pro/react/src/resize/index.ts'
/* 动画 */
import { motion } from 'framer-motion'
/* redux */
import { useDispatch, useSelector } from 'react-redux'
import { setChatExpended, setBoxWidth } from '../../redux/chat'
import { LeftCircleFilled } from '@ant-design/icons'
export default function AsideChat() {
  const { isOpen /* setOpen */ } = useState(true)
  /* redux */
  const dispatch = useDispatch()
  const isChatExpended = useSelector((state) => state.chat.isChatExpended)
  /* ref */
  const resizeBoxRef = useRef(null)

  /* 这个useEffect起到了一个钩子的效果 */
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      // 当尺寸变化时，更新宽度
      for (let entry of entries) {
        const newWidth = entry.contentRect.width
        dispatch(setBoxWidth(newWidth))
        // console.log('newWidth', newWidth)
      }
    })

    // 开始观察 DOM 元素的尺寸变化
    observer.observe(resizeBoxRef.current)

    // 组件卸载时停止观察
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="asideWrap" style={{ width: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isChatExpended ? 1 : 0,
          scale: isChatExpended ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        ref={resizeBoxRef}
      >
        <ResizeBox
          position="relative"
          right="0"
          minWidth="30vw"
          maxWidth="50vw"
          height={'87vh'}
          borderLeftWidth="3px"
          bg="blackAlpha.300"
          handlePosition="left"
        >
          <Sidebar
            position="sticky"
            top="56px"
            toggleBreakpoint="sm"
            isOpen={isOpen}
            width="100%"
            maxWidth="50vw"
            height="87vh"
          >
            <AliChat></AliChat>
          </Sidebar>
        </ResizeBox>
      </motion.div>
      {!isChatExpended && (
        <div
          className="open"
          style={{
            position: 'fixed',
            right: '30px',
            top: '50vh',
            cursor: 'pointer',
            color: 'black',
            zIndex: '10',
          }}
          onClick={() => dispatch(setChatExpended(true))}
        >
          <div>
            {/* <div>展开</div> */}
            <LeftCircleFilled />
          </div>
        </div>
      )}
    </div>
  )
}
