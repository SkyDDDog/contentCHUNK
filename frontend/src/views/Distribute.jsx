import React from 'react';
import {Col, Row, Segmented, Button, Input, DatePicker, Space} from 'antd';
import {UploadOutlined} from '@ant-design/icons'; // 导入UploadOutlined图标

const Distribute = () => (
  <div> {/* 添加根div元素 */}
    <Segmented size={'large'} options={['视频分发', '图片分发']} onChange={(value) => {
      console.log(value); // string
    }}/>

    <div>
      {/* 左侧 */}
      <Row gutter={30}>
        <Col span={12}>
          <h1 style={{marginTop: '20px', fontSize: '20px'}}>通用配置</h1>
          <Space direction="vertical">
            <Space direction={'horizontal'} size={'large'}
                   style={{marginTop: '20px', marginLeft: '20px', fontSize: '20px'}}>
              <label>发布内容</label>
              <Button size={'large'} color={'blue'}>从知识库选择</Button>
              <Button size={'large'} icon={<UploadOutlined/>}>上传</Button>
            </Space>
            <Space size={'large'} style={{fontSize: '20px', marginLeft: '20px', marginTop: '20px'}}
                   direction={'vertical'}>
              <h1>标题</h1>
              <Input size={'large'} placeholder="霸王茶姬宣传文案" style={{width: '200%'}}/>
              <h1>简介</h1>
              <Input size={'large'} placeholder="霸王茶姬宣传文案" style={{width: '200%'}}/>
              <h1>标签</h1>
              <Input size={'large'} placeholder="霸王茶姬宣传文案" style={{width: '200%'}}/>
              <h1>封面</h1>
              <Button size={'large'} icon={<UploadOutlined/>}>上传封面</Button>
              <h1>定时发布</h1>
              <DatePicker size={'large'} picker="date" placeholder="选择日期"/>
            </Space>
            <Button size={'large'} style={{backgroundColor: 'teal', color: 'white', width: '40%', marginTop: '20px', marginLeft: '20px'}}>
              AI自动填充
            </Button>
          </Space>
        </Col>

        {/*<Col span={2}><Divider type="vertical" style={{height: '100%'}}/></Col>*/}

        {/* 右侧内容调整 */}
        <Col span={12} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {/* 添加一个伪元素作为右侧的分隔线 */}
          <div style={{ position: 'absolute', left: '-3px', top: 0, bottom: 0, borderLeft: '1px solid #ccc', height: '100%' }}></div>
          <Button size={'large'} style={{backgroundColor: 'teal', color: 'white', width: '20%', marginTop: '20px'}}>
            发布记录
          </Button>
          <label size={'large'} style={{fontSize: '20px', marginTop: '20px', marginLeft: '20px'}}>单独配置</label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UploadOutlined style={{ fontSize: '70px', color: '#ccc', marginTop: '20px' }} />
            <span style={{ marginTop: '10px', color: '#666' }}>添加账号</span>
          </div>
          <Button size={'large'} style={{backgroundColor: 'teal', color: 'white', width: '20%', marginTop: '20px'}}>
            一键发布
          </Button>
        </Col>
      </Row>
    </div>
  </div>
);

export default Distribute;
