import React, { useState } from 'react'
import { Tree, Dropdown } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import {
  deleteItemByKeyInChildren,
  findItemByKey,
  updateTitleByKeyInChildren,
} from '../utils/tree'

// Tree原始数据
// 保证key唯一，表示的是item在Tree中的位置，以 '0-'（隐藏的根节点）开头
// 对Tree进行操作的时候，要先根据key在Tree中找到item后进行操作
const defaultData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0', // 表示
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    children: [
      {
        title: 'leaf',
        key: '0-1-0',
      },
    ],
  },
]

const App = () => {
  const [gData, setGData] = useState(defaultData)
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0'])
  const onDragEnter = (info) => {
    console.log(info)
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  }
  const onDrop = (info) => {
    console.log(info)
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]) // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data)
        }
        if (data[i].children) {
          loop(data[i].children, key, callback)
        }
      }
    }
    const data = [...gData]

    // Find dragObject
    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || []
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj)
      })
    } else {
      let ar = []
      let i
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i, 0, dragObj)
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i + 1, 0, dragObj)
      }
    }
    setGData(data)
  }

  // 自定义渲染Tree节点，添加右键菜单组件
  const titleRender = (nodeData) => {
    const menuItems = [
      {
        label: 'Duplicate',
        key: '1',
        icon: <MailOutlined />,
        onClick: () => {
          console.log('Duplicate', nodeData)
        },
      },
      {
        label: 'Rename',
        key: '2',
        onClick: () => {
          console.log('Rename', nodeData)
          // 找到需要操作的item
          let item = findItemByKey(defaultData, nodeData.key)
          console.log(item)
          setGData((prevData) => {
            // 使用递归函数来遍历数据并查找对应的项
            return prevData.map((item) => {
              if (item.key === nodeData.key) {
                // 如果找到了对应的项，则更新其 title 属性
                return {
                  ...item,
                  title: 'renamed title',
                }
              } else if (item.children) {
                // 如果当前项有子项，则递归调用该函数查找子项并更新
                return {
                  ...item,
                  children: updateTitleByKeyInChildren(
                    item.children,
                    nodeData.key,
                    'renamed title',
                  ),
                }
              }
              // 如果没有找到对应的项，则直接返回原始项
              return item
            })
          })
        },
      },
      {
        label: 'Delete',
        key: '3',
        onClick: () => {
          console.log('Delete', nodeData)
          const keyToDelete = nodeData.key
          setGData((prevData) => {
            // 使用递归函数来遍历数据并查找对应的项
            return prevData.filter((item) => {
              if (item.key === keyToDelete) {
                // 如果找到了对应的项，则过滤掉该项，即删除
                return false
              } else if (item.children) {
                // 如果当前项有子项，则递归调用该函数查找子项并删除
                item.children = deleteItemByKeyInChildren(
                  item.children,
                  keyToDelete,
                )
                return true
              }
              // 如果没有找到对应的项，则保留原始项
              return true
            })
          })
        },
      },
      {
        label: 'Add',
        key: '4',
        onClick: () => {
          console.log('Copy', nodeData)
        },
      },
    ]
    return (
      <Dropdown
        menu={{
          items: menuItems,
        }}
        trigger={['contextMenu']}
      >
        <div>{nodeData.title}</div>
      </Dropdown>
    )
  }
  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={expandedKeys}
      draggable={{
        icon: false,
      }}
      blockNode
      /* showLine */
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
      titleRender={titleRender}
    />
  )
}
export default App
