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
} from '@chakra-ui/react'
import { Input } from '@chatui/core'
import React from 'react'
export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

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
                <Input type="email" placeholder="请输入您的用户名" />
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="请输入您的密码" />
                <FormHelperText>
                  {"We'll never share your email."}
                </FormHelperText>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={onClose} ml={3}>
                Login
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
