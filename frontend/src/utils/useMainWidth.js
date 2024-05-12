import { useEffect, useState } from 'react'
import useViewportWidth from './useViewPortWidth'
import { useSelector } from 'react-redux'
const useMainWidth = (leftWidth, rightWidth) => {
  const [mainWidth, setMainWidth] = useState(0)
  const viewportWidth = useViewportWidth()

  const isChatExpended = useSelector((state) => state.chat.isChatExpended)
  /* 得到当前屏幕宽度 */
  useEffect(() => {
    /* 判断是否Chat折叠 */
    if (!isChatExpended) {
      rightWidth = 0
    }
    setMainWidth(viewportWidth - leftWidth - rightWidth - 100)
  }, [leftWidth, rightWidth, viewportWidth, isChatExpended])

  return mainWidth
}

export default useMainWidth
