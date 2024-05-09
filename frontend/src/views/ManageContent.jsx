import React from 'react';
// import { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import { Button } from "@chakra-ui/react";
import { SearchOutlined, AlignLeftOutlined } from '@ant-design/icons';
// import { Dayjs } from 'dayjs';

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: '公众号发布的文章标题.' },
        { type: 'success', content: '小红书发布的文章标题.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: '小红书发布的文章标题.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: '抖音发布的文章标题.' },
        { type: 'success', content: '小红书发布的文章标题.' },
        { type: 'error', content: '小红书发布的文章标题.' },
        { type: 'error', content: '小红书发布的文章标题.' },
        { type: 'error', content: '小红书发布的文章标题.' },
        { type: 'error', content: '小红书发布的文章标题.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const ManageContent = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = function(value) {
    var listData = getListData(value);
    return /*#__PURE__*/React.createElement("ul", {
      className: "events"
    }, listData.map(function (item) {
      return /*#__PURE__*/React.createElement("li", {
        key: item.content
      }, /*#__PURE__*/React.createElement(Badge, {
        status: item.type,
        text: item.content
      }));
    }));
  };

  var cellRender = function cellRender(current, info) {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <Button marginRight={"20px"} colorScheme='teal' variant='solid' leftIcon={<SearchOutlined />}>
        搜索
      </Button>
      <Button colorScheme='teal' variant='outline' leftIcon={<AlignLeftOutlined />}>
        筛选
      </Button>
      <Calendar cellRender={cellRender} />
    </>
  );
};

export default ManageContent;
