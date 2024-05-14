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
} from '@chakra-ui/react'
import { Input } from '@chatui/core'
import React from 'react'
import { Login } from '../api/userRequest'

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [username, setUsername] = React.useState('lear')
  const [password, setPassword] = React.useState('123465')
  const toast = useToast()
  function login() {
    let data = {
      username,
      password,
    }
    Login(data)
      .then((res) => {
        console.log('res', res)
        if (res.status === 500 || res.data.msgCode != 0) {
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
        toast({
          title: '登录成功.',
          description: "Let's create !",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      })
      .finally(() => {
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
