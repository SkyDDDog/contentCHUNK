import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  Flex
} from '@chakra-ui/react'

export default function ManageCard() {
  return (
    <Flex
      wrap='wrap' // 这会让卡片在空间不足时自动换行
      justify='flex-start' // 左对齐
      align='flex-start' // 上对齐
      mt={-2} // 增加一些顶部的间距
      ml={-2} // 增加一些左侧的间距
      gap={4} // 添加卡片之间的间距，4单位可以按需调整
    >
      <ManageCard_ />
      <ManageCard_ />
      <ManageCard_ />
      <ManageCard_ />
      <ManageCard_ />
      <ManageCard_ />
      <ManageCard_ />
      <ManageCard_ />
    </Flex>
  )
}

function ManageCard_() {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src='https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF'
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>雨水|云南普洱</Heading>
          <Text>
            霸王茶姬CHAGEE
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            4月8日
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
            查看详情
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            删除
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
