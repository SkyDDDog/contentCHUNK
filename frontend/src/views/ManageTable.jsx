import {Button, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Box} from "@chakra-ui/react";
import {AlignLeftOutlined, SearchOutlined} from "@ant-design/icons";
import React from "react";

export default function ManageTable()
{
    return (
        <>
          <Button marginRight={"20px"} colorScheme='teal' variant='solid' leftIcon={<SearchOutlined />}>
            搜索
          </Button>
          <Button colorScheme='teal' variant='outline' leftIcon={<AlignLeftOutlined />}>
            筛选
          </Button>

          <Box width="auto" height="auto" mb={30}>
            {/* 这里是一个空白间隔 */}
          </Box>

          <TableContainer>
            <Table variant='striped'>
              {/*<TableCaption>Imperial to metric conversion factors</TableCaption>*/}
              <Thead>
                <Tr>
                  <Th>发布时间</Th>
                  <Th>文章标题</Th>
                  <Th>发布账号</Th>
                  <Th>发布平台</Th>
                  <Th>点赞</Th>
                  <Th>收藏</Th>
                  <Th>评论</Th>
                  <Th>综合评分</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>2024-03-12</Td>
                  <Td>雨水|云南普洱</Td>
                  <Td>霸王茶姬CHAGEE</Td>
                  <Td>小红书</Td>
                  <Td>2346</Td>
                  <Td>2346</Td>
                  <Td>1212</Td>
                  <Td>8.7</Td>
                </Tr>
                <Tr>
                  <Td>2024-03-12</Td>
                  <Td>雨水|云南普洱</Td>
                  <Td>霸王茶姬CHAGEE</Td>
                  <Td>小红书</Td>
                  <Td>2346</Td>
                  <Td>2346</Td>
                  <Td>1212</Td>
                  <Td>8.7</Td>
                </Tr>
                <Tr>
                  <Td>2024-03-12</Td>
                  <Td>雨水|云南普洱</Td>
                  <Td>霸王茶姬CHAGEE</Td>
                  <Td>小红书</Td>
                  <Td>2346</Td>
                  <Td>2346</Td>
                  <Td>1212</Td>
                  <Td>8.7</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>发布时间</Th>
                  <Th>文章标题</Th>
                  <Th>发布账号</Th>
                  <Th>发布平台</Th>
                  <Th>点赞</Th>
                  <Th>收藏</Th>
                  <Th>评论</Th>
                  <Th>综合评分</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </>
    )
}
