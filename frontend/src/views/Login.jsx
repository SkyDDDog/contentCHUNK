import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { Input } from '@chatui/core'
import React, { useState } from 'react'
import { Login } from '../api/userRequest'
import { useDispatch } from 'react-redux'
import {
  setKnowLedgeList,
  setLoginStatus,
  setPublishHistory,
  setUserInfo,
} from '../redux/userSlice'
import {
  GetKnowLedgeList,
  // GetPagesByKnowLedgeId,
} from '../api/knowledgeRequest'
import { GetSuccessPublishedHistory } from '../api/wechat'

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [username, setUsername] = React.useState('lear')
  const [password, setPassword] = React.useState('123465')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const dispatch = useDispatch()

  async function login() {
    setIsLoading(true)
    let data = {
      username,
      password,
    }
    Login(data)
      .then(async (res) => {
        console.log('res', res)
        if (res.data.msgCode != 0) {
          toast({
            title: '登录失败.',
            description: res.msg,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
          return
        }
        /* 登录成功 */
        /* 设置token */
        const token = res.data.item.token.access_token
        if (token) {
          localStorage.setItem('token', token)
        }
        /* 设置登录状态 */
        dispatch(setLoginStatus(true))
        /* 设置用户信息 */
        dispatch(setUserInfo(res.data.item.user))
        /* 获取知识库 */
        let knowledges = (await GetKnowLedgeList(res.data.item.user.id)).data
          .item.knowledge
        // 获取成功发布的文章
        let articles = (await GetSuccessPublishedHistory(res.data.item.user.id))
          .data.item.articles
        console.log('articles', articles)
        dispatch(setPublishHistory(articles.reverse()))
        console.log('knowledges', knowledges)
        /* 获取Page */
        /* 循环 */
        // knowledges.forEach(element => {
        //   let pages = GetPagesByKnowLedgeId(knowledges[0].id)
        // });

        dispatch(setKnowLedgeList(knowledges))

        /* 提示 */
        toast({
          title: '登录成功.',
          description: "Let's create !",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch((err) => {
        toast({
          title: '登录失败.',
          description: err.msg,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
      .finally(() => {
        /* 停止loading */
        setIsLoading(false)
        /* 关闭对话框 */
        onClose()
      })
  }
  return (
    <>
      <Button colorScheme="gray" onClick={onOpen}>
        Login
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Login
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  type="email"
                  placeholder="请输入您的用户名"
                  onChange={(value) => setUsername(value)}
                />
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  type="password"
                  placeholder="请输入您的密码"
                  onChange={(value) => setPassword(value)}
                />
                <FormHelperText>
                  {"We'll never share your email."}
                </FormHelperText>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              {isLoading && (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="md"
                  marginRight="15px"
                />
              )}

              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={login} ml={3}>
                Login
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
