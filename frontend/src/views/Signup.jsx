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
  // FormFeedback,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { Input } from '@chatui/core'
import React, { useState } from 'react'
import { Register } from '../api/userRequest'

export default function Signup() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const cancelRef = React.useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    setValidationError(null) // 清除之前的错误信息

    // 数据验证
    if (!username || !password) {
      setValidationError('请确保用户名和密码已填写')
      setIsLoading(false)
      return
    }

    try {
      // 调用注册API
      const response = await Register({ username, password })

      if (response.data.success) {
        // 注册成功
        // 这里你可以添加一些成功后的操作，比如跳转到登录页面或显示成功消息
        toast({
          title: '注册成功.',
          description: '欢迎加入！请登录开始你的体验。',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        onClose()
      } else {
        // 注册失败
        setValidationError(response.data.message)
      }
    } catch (error) {
      // API调用出错
      setValidationError('注册时发生错误，请稍后再试')
      toast({
        title: '注册失败.',
        description: error.msg,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Sign up
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              colorScheme="teal"
              fontSize="lg"
              fontWeight="bold"
            >
              Sign up
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl isInvalid={!!validationError}>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  type="email"
                  placeholder="请输入您的用户名"
                  onChange={(value) => setUsername(value)}
                />
                {/*<FormFeedback>{validationError}</FormFeedback>*/}
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
              <Button colorScheme="teal" onClick={handleSubmit} ml={3} disabled={isLoading}>
                Sign up
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
