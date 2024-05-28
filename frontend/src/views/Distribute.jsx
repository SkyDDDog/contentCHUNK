import React from 'react'
import { Col, Row, Segmented, Button, Input, DatePicker, Space } from 'antd'
import { UploadOutlined } from '@ant-design/icons' // 导入UploadOutlined图标
import { useLocation } from 'react-router-dom'
import { PublishPage, GetPublishState } from '../api/weChat'
import { useSelector } from 'react-redux'
const Distribute = () => {
  const {
    state: { title, content },
  } = useLocation()
  console.log('title', title, 'content', content)
  const userId = useSelector((state) => state.user.userInfo.id)
  let publishId = ''
  async function publish() {
    let res = await PublishPage(userId, {
      title,
      content,
    })
    console.log('pulish res', res)
    publishId = res.data.item.publish_id
    setTimeout(() => {
      getPublishState(publishId)
    }, 3000)
  }

  function getPublishState(publishId) {
    let res = GetPublishState(userId, publishId)
    if (res.msgCode == 0) {
      console.log('已发布，', res.data.item.articleUrl)
      // clearInterval(timer)
    } else {
      console.log('未发布')
    }
  }

  // let timer = setInterval(() => {
  //   getPublishState()
  //   console.log('轮询')
  // }, 1000)

  return (
    <div>
      {' '}
      {/* 添加根div元素 */}
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
              <span style={{ marginTop: '10px', color: '#666' }}>添加账号</span>
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
  )
}

export default Distribute
