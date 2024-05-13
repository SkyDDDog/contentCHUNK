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
                Sign up
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
