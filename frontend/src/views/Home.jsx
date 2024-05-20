import React from 'react';
import { Col, Card, ConfigProvider, Space, Statistic, Avatar, Typography } from 'antd';
import PropTypes from 'prop-types';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const AccountCountTitle = ({ count }) => {
  return (
    <div>
      管理账号数量
      <span
        style={{
          backgroundColor: '#008080',
          color: '#fff',
          borderRadius: '4px',
          marginLeft: '10px',
          paddingRight: '4px',
          paddingLeft: '4px',
          display: 'inline-block',
        }}
      >
        {count}
      </span>
    </div>
  );
};

AccountCountTitle.propTypes = {
  count: PropTypes.number.isRequired,
};

const ImageWithUrl = ({ imageUrl }) => {
  return (
    <img
      src={imageUrl}
      alt="Image Description" // 添加一个描述性的alt属性
      style={{ maxWidth: '100%', height: 'auto' }} // 图片自适应大小
    />
  );
};

ImageWithUrl.propTypes = {
  imageUrl: PropTypes.string.isRequired, // 图片URL是必需的
};

const CustomStatisticCol = ({
                              title,
                              value,
                              percentValue,
                              percentColor,
                              prefixIcon = <ArrowUpOutlined />,
                            }) => {
  CustomStatisticCol.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percentValue: PropTypes.number.isRequired,
    percentColor: PropTypes.string,
    prefixIcon: PropTypes.element,
  };

  return (
    <Col
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderRadius: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        marginLeft: '10px',
        marginRight: '10px',
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Statistic: {
              titleFontSize: '16px',
              contentFontSize: '36px',
            },
          },
        }}
      >
        <Statistic title={title} value={value} />
      </ConfigProvider>
      <Statistic
        size={'default'}
        value={percentValue}
        precision={2}
        valueStyle={{ color: percentColor || '#860000' }}
        prefix={prefixIcon}
        suffix="%"
      />
    </Col>
  );
};


const ImageTextCard = ({ image, topText, middleText, bottomText }) => {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Avatar src={image} style={{ width: '100px', height: '100px', marginBottom: '16px' }} />
      <Typography.Title level={4}>{topText}</Typography.Title>
      <Typography.Paragraph style={{ textAlign: 'center' }}>{middleText}</Typography.Paragraph>
      <Typography.Paragraph>{bottomText}</Typography.Paragraph>
    </Card>
  );
};


ImageTextCard.propTypes = {
  image: PropTypes.string.isRequired,
  topText: PropTypes.string.isRequired,
  middleText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
};


export default function Home() {
  const cardWidth = '100%';
  const accountCount = 5; // 这里用静态数字，实际应从数据源获取

  return (
    <>
      <Space
        direction="vertical"
        size={16}
        style={{ width: '100%', padding: '16px 0' }}
      >
        <Card
          title={<AccountCountTitle count={accountCount} />}
          extra={<a href="#">More</a>}
          style={{ width: cardWidth, marginBottom: '16px' }}
        >
          <Space
            direction="horizontal"
            justify="space-between"
          >
            <CustomStatisticCol
              title="点赞"
              value={112893}
              percentValue={11.28}
            />
            <Col style={{ width: '100px'}}></Col>
            <CustomStatisticCol
              title="评论"
              value={23456}
              percentValue={2.34}
              percentColor="#00b300" // 自定义颜色
            />
            <Col style={{ width: '100px'}}></Col>
            <CustomStatisticCol
              title="分享"
              value={7890}
              percentValue={7.89}
              prefixIcon={<ArrowDownOutlined />} // 自定义图标
            />
          </Space>
        </Card>

        <Card
          title={'体验一下'}
          extra={<a href="#">More</a>}
          style={{ width: cardWidth, marginBottom: '16px' }}
        >
          <Space
            direction="horizontal"
            justify="space-between"
          >
            <ImageTextCard
              image={<ImageWithUrl imageUrl={'http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280'} />}
              topText={"新闻稿"}
              middleText={'苹果放弃造车计划'}
              bottomText={'苹果放弃造车计划'}
            />
            <Col style={{ width: '10px'}}></Col>
            <ImageTextCard
              image={<ImageWithUrl imageUrl={'http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280'} />}
              topText={"新闻稿"}
              middleText={'苹果放弃造车计划'}
              bottomText={'苹果放弃造车计划'}
            />
            <Col style={{ width: '10px'}}></Col>
            <ImageTextCard
              image={<ImageWithUrl imageUrl={'http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280'} />}
              topText={"新闻稿"}
              middleText={'苹果放弃造车计划'}
              bottomText={'苹果放弃造车计划'}
            />
            <Col style={{ width: '10px'}}></Col>
            <ImageTextCard
              image={<ImageWithUrl imageUrl={'http://gips3.baidu.com/it/u=1821127123,1149655687&fm=3028&app=3028&f=JPEG&fmt=auto?w=720&h=1280'} />}
              topText={"新闻稿"}
              middleText={'苹果放弃造车计划'}
              bottomText={'苹果放弃造车计划'}
            />
          </Space>
        </Card>

        <Card
          title={'草稿箱'}
          extra={<a href="#">More</a>}
          style={{ width: cardWidth, marginBottom: '16px' }}
        >
          <Space
            direction="horizontal"
            justify="space-between"
          >

          </Space>
        </Card>

      </Space>
    </>
  );
}
