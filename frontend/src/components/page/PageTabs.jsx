import React, { useEffect, useMemo, useState } from 'react'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { removeActiveTabItem } from '../../redux/page'

const App = () => {
  const dispatch = useDispatch()

  const [activeKey, setActiveKey] = useState('1')
  const tabPages = useSelector((state) => state.page.tabPages)
  const activeTabKey = useSelector((state) => state.page.activePageKey)
  /* 当点击Nav的时候也会更新Tab的状态 */
  useEffect(() => {
    setActiveKey(activeTabKey)
  }, [activeTabKey])

  const tabItems = useMemo(() => {
    /* setActiveKey(tabPages[tabPages.length - 1].pageId) */
    return tabPages.map((page) => {
      return {
        label: page.title,
        key: page.pageId,
      }
    })
  }, [tabPages])
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey)
    console.log('onChange', newActiveKey)
  }

  const remove = (targetKey) => {
    dispatch(removeActiveTabItem({ pageId: targetKey }))
  }
  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      remove(targetKey)
    }
  }

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      items={tabItems}
      onEdit={onEdit}
      hideAdd
    />
  )
}
export default App
