import React, { useEffect, useState } from 'react'
import { Tree, Dropdown, Input } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderOutlined,
} from '@ant-design/icons'
import {
  deleteItemByKeyInChildren,
  transFormBackEndToTreeData,
  transFormTreeDataToBackEnd,
} from '../../../utils/tree'
import {
  GetKnowLedgeList,
  UpdateKnowledgeByUserId,
} from '../../../api/knowledgeRequest'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addActivePage } from '../../../redux/page'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { setKnowLedgeList } from '../../../redux/userSlice'

// Tree原始数据
// 保证key唯一，表示的是item在Tree中的位置，以 '0-'（隐藏的根节点）开头
// 对Tree进行操作的时候，要先根据key在Tree中找到item后进行操作

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const knowledgeList = useSelector((state) => state.user.knowledgeList)
  const userInfo = useSelector((state) => state.user.userInfo)
  console.log('knowledgeList', knowledgeList)
  /* 保持与redux中的knowledge同步 */
  const [treeData, setTreeData] = useState([])
  useEffect(() => {
    let data = knowledgeList.map((item) => {
      let tmp = transFormBackEndToTreeData(item)
      console.log('Tree data', tmp)
      return tmp
    })
    if (data.length === 0) {
      data = [
        {
          type: '0',
          title: '根目录',
          key: '0',
          children: [],
        },
      ]
    }
    setTreeData(data)
  }, [knowledgeList])
  /*  const treeData = useMemo(() => {
    return knowledgeList.map((item) => {
      let data = transFormBackEndToTreeData(item)
      console.log('Tree data', data)
      return data
    })
  }, [knowledgeList]) */
  /* 要提交的TreeData，保持与TreeData同步 */
  // ...

  /* 渲染需要的数据 */
  // const [gData, setGData] = useState(treeData)
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0'])
  // 控制重命名
  const { isOpen, onOpen, onClose } = useDisclosure()
  /* 控制Modal框状态 */
  const [modelTitle, setModalTitle] = useState('Undefined')
  /* 当前被选中的节点 */
  const [activeNode, setActiveNode] = useState({})
  /* Modal框input的值 */
  const [modalValue, setModalValue] = useState('')
  useEffect(() => {
    console.log('activeNode', activeNode)
  }, [activeNode])

  const onDragEnter = (info) => {
    console.log(info)
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  }

  // 自定义渲染Tree节点，添加右键菜单组件
  const titleRender = (nodeData) => {
    const menuItems = [
      {
        label: '新建文件夹',
        key: '0',
        icon: <CopyOutlined />,
        onClick: () => {
          console.log('Duplicate', nodeData)
        },
      },
      {
        label: '新建页面',
        key: '1',
        icon: <CopyOutlined />,
        onClick: () => {
          setActiveNode(nodeData)
          setModalTitle('新建页面')
          // setModalValue(nodeData.title)
          onOpen()
          console.log('Duplicate', nodeData)
        },
      },
      {
        label: '复制',
        key: '2',
        icon: <CopyOutlined />,
        onClick: () => {
          setActiveNode(nodeData)
          console.log('Duplicate', nodeData)
        },
      },
      {
        label: '重命名',
        key: '3',
        icon: <EditOutlined />,
        onClick: () => {
          setModalTitle('重命名')
          setActiveNode(nodeData)
          setModalValue(nodeData.title)

          console.log('Rename', nodeData)
          onOpen()
        },
      },
      {
        label: '删除',
        key: '4',
        icon: <DeleteOutlined />,
        onClick: () => {
          setActiveNode(nodeData)
          console.log('Delete', nodeData)
          const keyToDelete = nodeData.key
          setTreeData((prevData) => {
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

          setTimeout(() => {
            console.log('treeData', treeData)

            let data = treeData.map((item) => {
              return transFormTreeDataToBackEnd(item)
            })
            console.log('datatatat', data)

            UpdateKnowledgeByUserId(userInfo.id, data).then((res) => {
              console.log('res', res)
              /* 更新tree */

              onClose()
              setModalValue('')
            })
          }, 1000)
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
        <div>
          <div>{nodeData.title}</div>
        </div>
      </Dropdown>
    )
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
    const data = [...treeData]

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
    setTreeData(data)
  }

  /* 选中Tree */
  function onSelect(selectedKeys, info) {
    console.log('selected', selectedKeys, info)
    let payload = {
      title: info.node.title,
      pageId: info.node.key,
    }
    /* 表示是叶子 */
    if (
      info.node.type === '1' ||
      !info.node.children ||
      info.node.children.length === 0
    ) {
      //是叶子节点
      console.log('叶子')
      // 更新仓库状态
      dispatch(addActivePage(payload))
      navigate(`/page/${info.node.key}`)
    }
  }
  async function reloadTreeData() {
    let knowledges = (await GetKnowLedgeList(userInfo.id)).data.item.knowledge
    dispatch(setKnowLedgeList(knowledges))
  }

  function onConfirmModal() {
    if (modelTitle === '重命名') {
      activeNode.title = modalValue
      console.log('activeNode.title', activeNode.title)
    } else if (modelTitle === '新建页面') {
      console.log('新建页面父节点', activeNode)
      let newChild = {
        type: '1',
        title: modalValue,
      }
      if (!activeNode.children) {
        activeNode.children = []
        activeNode.type = '0'
      }
      activeNode.children.push(newChild)
    }

    setTreeData(treeData)
    let data = treeData.map((item) => {
      return transFormTreeDataToBackEnd(item)
    })
    console.log('datatatat', data)

    UpdateKnowledgeByUserId(userInfo.id, data).then((res) => {
      console.log('res', res)
      /* 更新tree */
      reloadTreeData()
      onClose()
      setModalValue('')
    })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modelTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
            ></Input>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={() => {
                onClose()
                setModalValue('')
              }}
            >
              关闭
            </Button>
            <Button onClick={onConfirmModal} colorScheme="teal">
              确定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Tree
        defaultExpandAll
        className="draggable-tree"
        defaultExpandedKeys={expandedKeys}
        draggable={{
          icon: false,
        }}
        blockNode
        showIcon
        switcherIcon={<FolderOutlined />}
        /* showLine */
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={treeData}
        titleRender={titleRender}
        onSelect={onSelect}
      />
    </>
  )
}
export default App
