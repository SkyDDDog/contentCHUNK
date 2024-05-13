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
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const toast = useToast()
  function login() {
    let data = {
      username,
      password,
    }
    Login(data)
      .then(
        (res) => {
          console.log('res', res)
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          /* 关闭对话框 */
          onClose()
        },
        (err) => {
          console.log('err', err)
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        },
      )
      .catch((err) => {
        toast({
          title: 'Login Filed.',
          description: err,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
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
