import { useState, useEffect } from 'react'

const useViewportWidth = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // 只在组件挂载和卸载时执行

  return viewportWidth
}

export default useViewportWidth
