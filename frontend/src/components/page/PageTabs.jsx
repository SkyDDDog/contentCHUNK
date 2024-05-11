import React, { useRef, useState } from 'react'
import { Tabs } from 'antd'
const initialItems = [
  {
    label: 'Tab 1',
    key: '1',
  },
  {
    label: 'Tab 2',
    key: '2',
  },
  {
    label: 'Tab 3',
    key: '3',
    closable: false,
  },
]
const App = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key)
  const [items, setItems] = useState(initialItems)
  const newTabIndex = useRef(0)
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey)
  }
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`
    const newPanes = [...items]
    newPanes.push({
      label: 'New Tab',
      key: newActiveKey,
    })
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }
  const remove = (targetKey) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1
      }
    })
    const newPanes = items.filter((item) => item.key !== targetKey)
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key
      } else {
        newActiveKey = newPanes[0].key
      }
    }
    setItems(newPanes)
    setActiveKey(newActiveKey)
  }
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add()
    } else {
      remove(targetKey)
    }
  }
  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  )
}
export default App
