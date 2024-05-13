import React from 'react';
import {Col, Row, Segmented, Button, Input, DatePicker, Space} from 'antd';
import { UploadOutlined } from '@ant-design/icons'; // 导入UploadOutlined图标

const Distrubute = () => (
  <div> {/* 添加根div元素 */}
    <Segmented size={'large'} options={['视频分发', '图片分发']} onChange={(value) => {
      console.log(value); // string
    }}/>

    <div>
      {/* 左侧 */}
      <Row gutter={24}>
        <Col span={12}>
          <h1>通用配置</h1>
          <Space direction="vertical">
            <Button>从知识库选择</Button>
            <Button icon={<UploadOutlined/>}>上传</Button>
            <h1>标题</h1>
            <Input/>
            <h1>简介</h1>
            <Input/>
            <h1>标签</h1>
            <Input/>
            <h1>封面</h1>
            <Button icon={<UploadOutlined/>}>上传封面</Button>
            <h1>定时发布</h1>
            <DatePicker picker="date" placeholder="选择日期"/>
          </Space>
        </Col>

        {/* 右侧 */}
        <Col span={12}>
          <Row justify="flex-end">
            <Button>发布记录</Button>
          </Row>
          <h1>单独配置</h1>
          <Button>添加账号</Button>
          <Row justify="flex-end" style={{marginTop: '20px'}}>
            <Button type="primary">一键发布</Button>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
);

export default Distrubute;
