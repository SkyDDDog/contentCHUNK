import {Pie} from "@ant-design/plots";
import React from "react";
import {Line} from "@ant-design/charts";
import { useStatistics } from '../api/WechatArticleStats';
import { useUserStatistics } from '../api/WechatFollowerStats';
import {
  Box, Button,
  Card,
  CardBody, CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs, Text,
  Divider
} from "@chakra-ui/react";
import {TikTokOutlined, WechatOutlined} from "@ant-design/icons";
import Jinritoutiao from "../assets/image/logo/jinritoutiao.svg";

export default function ManageOverview() {
  const { stats } = useStatistics();
  const { userStats } = useUserStatistics();

  return (
    <>
      <Tabs variant='enclosed' colorScheme='whatsapp'>
        <TabList>
          <Tab>
            <WechatOutlined /> &nbsp;&nbsp;微信公众号
          </Tab>
          <Tab>
            <TikTokOutlined /> &nbsp;&nbsp;抖音
          </Tab>
          <Tab>
            <img src={Jinritoutiao}/> &nbsp;&nbsp;头条号
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel style={{ display: 'flex', flexDirection: 'row' }}>
            <Test />
            <DemoPie />
          </TabPanel>
          <TabPanel style={{ display: 'flex', flexDirection: 'row' }}>
            <Test />
            <DemoPie />
          </TabPanel>
          <TabPanel style={{ display: 'flex', flexDirection: 'row' }}>
            <Test />
            <DemoPie />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Box width="auto" height="auto" mb={15}>
        {/* 这里是一个空白间隔 */}
      </Box>
      <Divider />
      <Box width="auto" height="auto" mb={19}>
        {/* 这里是一个空白间隔 */}
      </Box>

      <SimpleGrid spacing={'13%'} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' backgroundColor={'#ffffff'}>
        <Card backgroundColor={"#fafafa"}>
          <CardHeader>
            <Heading size='md'>
              <WechatOutlined /> &nbsp;&nbsp;微信公众号
            </Heading>
          </CardHeader>
          <CardBody>
            <Box width="auto" height="auto" mb={5}/>
            <Text fontWeight={'bold'}>文章标题:&nbsp;&nbsp;{stats.length > 0 && stats[0].title}</Text>
            <Box width="auto" height="auto" mb={2}/>
            <Text fontWeight={'bold'}>总浏览量:&nbsp;&nbsp;{stats[0].read}</Text>
            <Box width="auto" height="auto" mb={2}/>
            <Text fontWeight={'bold'}>新增关注:&nbsp;&nbsp;{userStats.newUser - userStats.cancelUser}</Text>
          </CardBody>
          <CardFooter>
            <Button>稿件分析 &gt;&gt;</Button>
          </CardFooter>
        </Card>
        <Card backgroundColor={"#fafafa"}>
          <CardHeader>
            <Heading size='md'>
              <TikTokOutlined /> &nbsp;&nbsp;抖音
            </Heading>
          </CardHeader>
          <CardBody>
            <Box width="auto" height="auto" mb={5}/>
            <Text fontWeight={'bold'}>文章标题:</Text>
            <Box width="auto" height="auto" mb={2}/>
            <Text fontWeight={'bold'}>昨日浏览:</Text>
            <Box width="auto" height="auto" mb={2}/>
            <Text fontWeight={'bold'}>新增评论:</Text>
          </CardBody>
          <CardFooter>
            <Button>稿件分析 &gt;&gt;</Button>
          </CardFooter>
        </Card>
        <Card backgroundColor={"#fafafa"}>
          <CardHeader>
            <Heading size='md' style={{ display: 'flex', flexDirection: 'row' }}>
              <img src={Jinritoutiao}/> &nbsp;&nbsp;头条号
            </Heading>
          </CardHeader>
          <CardBody>
            <Box width="auto" height="auto" mb={5}/>
            <Text fontWeight={'bold'}>文章标题:</Text>
            <Box width="auto" height="auto" mb={2}/>
            <Text fontWeight={'bold'}>昨日浏览:</Text>
            <Box width="auto" height="auto" mb={2}/>
            <Text fontWeight={'bold'}>新增评论:</Text>
          </CardBody>
          <CardFooter>
            <Button>稿件分析 &gt;&gt;</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </>
  )
}

const DemoPie = () => {
  const config = {
    data: [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};

const Test = () => {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const config = {
    data,
    title: {
      visible: true,
      text: '带数据点的折线图',
    },
    xField: 'year',
    yField: 'value',
  };
  return <Line {...config} />;
};
