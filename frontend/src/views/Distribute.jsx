import React from 'react'
import { Col, Row, Segmented, Button, Input, DatePicker, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons' // 导入UploadOutlined图标
import { useLocation } from 'react-router-dom'

import { GetSuccessPublishedHistory, PublishPage } from '../api/wechat'
import { useDispatch, useSelector } from 'react-redux'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  useDisclosure,
  AlertDialogOverlay,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from '@chakra-ui/react'
import '../assets/css/history.css'
import { Spin } from 'antd'
import { setPublishHistory } from '../redux/userSlice'

const Distribute = () => {
  const [spinning, setSpinning] = React.useState(false)
  /*   const showLoader = (duration) => {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
    }, duration)
  } */
  const toast = useToast()
  // const isPublish = useSelector((state) => state.page.isPublishing)
  const { state } = useLocation()
  const dispatch = useDispatch()
  let title = state?.title
  let content = state?.content
  console.log('title', title, 'content', content)
  const userId = useSelector((state) => state.user.userInfo.id)
  const publishHistory = useSelector((state) => state.user.publishHistory)
  console.log('here articles', publishHistory)

  async function publish() {
    setSpinning(true)
    let res = await PublishPage(userId, {
      title,
      content,
    })

    toast({
      title: '已提交，请等待审核',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    // 重新加载发布记录
    await getPublishState()
    setSpinning(false)
    onOpen()
    console.log('pulish res', res)
  }

  async function getPublishState() {
    let articles = (await GetSuccessPublishedHistory(userId)).data.item
      ?.articles
    console.log('articles', articles)
    dispatch(setPublishHistory(articles.reverse()))
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  async function showHistoryDialog() {
    let articles = (await GetSuccessPublishedHistory(userId)).data.item
      ?.articles
    console.log('articles', articles)
    dispatch(setPublishHistory(articles.reverse()))
    console.log('open dialog')
    onOpen()
  }

  // let timer = setInterval(() => {
  //   getPublishState()
  //   console.log('轮询')
  // }, 1000)

  return (
    <>
      {' '}
      <div>
        {/* 添加根div元素 */}
        <Spin spinning={spinning} fullscreen />
        <Segmented
          size={'large'}
          options={['视频分发', '图片分发']}
          onChange={(value) => {
            console.log(value) // string
          }}
        />
        <div>
          {/* 左侧 */}
          <Row gutter={30}>
            <Col span={12}>
              <h1 style={{ marginTop: '20px', fontSize: '20px' }}>通用配置</h1>
              <Space direction="vertical">
                <Space
                  direction={'horizontal'}
                  size={'large'}
                  style={{
                    marginTop: '20px',
                    marginLeft: '20px',
                    fontSize: '20px',
                  }}
                >
                  <label>发布内容</label>
                  <Button size={'large'} color={'blue'}>
                    从知识库选择
                  </Button>
                  <Button size={'large'} icon={<UploadOutlined />}>
                    上传
                  </Button>
                </Space>
                <Space
                  size={'large'}
                  style={{
                    fontSize: '20px',
                    marginLeft: '20px',
                    marginTop: '20px',
                  }}
                  direction={'vertical'}
                >
                  <h1>标题</h1>
                  <Input
                    size={'large'}
                    placeholder="霸王茶姬宣传文案"
                    style={{ width: '200%' }}
                    value={title}
                    onChange={(e) => {
                      title = e.target.value
                    }}
                  />
                  <h1>内容</h1>
                  <Input
                    size={'large'}
                    placeholder="霸王茶姬宣传文案"
                    style={{ width: '200%' }}
                    value={content}
                  />
                  <h1>简介</h1>
                  <Input
                    size={'large'}
                    placeholder="霸王茶姬宣传文案"
                    style={{ width: '200%' }}
                  />
                  <h1>封面</h1>
                  <Button size={'large'} icon={<UploadOutlined />}>
                    上传封面
                  </Button>
                  <h1>定时发布</h1>
                  <DatePicker
                    size={'large'}
                    picker="date"
                    placeholder="选择日期"
                  />
                </Space>
                <Button
                  size={'large'}
                  style={{
                    backgroundColor: 'teal',
                    color: 'white',
                    width: '40%',
                    marginTop: '20px',
                    marginLeft: '20px',
                  }}
                >
                  AI自动填充
                </Button>
              </Space>
            </Col>

            {/*<Col span={2}><Divider type="vertical" style={{height: '100%'}}/></Col>*/}

            {/* 右侧内容调整 */}
            <Col
              span={12}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* 添加一个伪元素作为右侧的分隔线 */}
              <div
                style={{
                  position: 'absolute',
                  left: '-3px',
                  top: 0,
                  bottom: 0,
                  borderLeft: '1px solid #ccc',
                  height: '100%',
                }}
              ></div>
              <Button
                size={'large'}
                style={{
                  backgroundColor: 'teal',
                  color: 'white',
                  width: '20%',
                  marginTop: '20px',
                }}
                onClick={showHistoryDialog}
              >
                发布记录
              </Button>
              <label
                size={'large'}
                style={{
                  fontSize: '20px',
                  marginTop: '20px',
                  marginLeft: '20px',
                }}
              >
                单独配置
              </label>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <UploadOutlined
                  style={{ fontSize: '70px', color: '#ccc', marginTop: '20px' }}
                />
                <span style={{ marginTop: '10px', color: '#666' }}>
                  添加账号
                </span>
              </div>
              <Button
                size={'large'}
                style={{
                  backgroundColor: 'teal',
                  color: 'white',
                  width: '20%',
                  marginTop: '20px',
                }}
                onClick={publish}
              >
                一键发布
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div className="test"></div>
      <AlertDialog
        maxWidth={'100vw'}
        height={'70vh'}
        isCentered
        lockFocusAcrossFrames
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        preserveScrollBarGap
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              发布记录
            </AlertDialogHeader>

            <AlertDialogBody>
              <TableContainer maxHeight={'60vh'} overflowY={'auto'}>
                <Table variant="simple">
                  <TableCaption>没有更多记录了</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>文章标题</Th>
                      <Th>内容</Th>
                      <Th>链接</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {publishHistory.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td>{item.title}</Td>
                          <Td maxWidth={'200px'} overflowX={'auto'}>
                            {item.content}
                          </Td>
                          <Td maxWidth={'300px'} overflowX={'auto'}>
                            {item.url ? (
                              <a
                                style={{
                                  color: 'blue',
                                }}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {item.url}
                              </a>
                            ) : (
                              '等待审核中'
                            )}
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                  <Tfoot></Tfoot>
                </Table>
              </TableContainer>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                关闭
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default Distribute
