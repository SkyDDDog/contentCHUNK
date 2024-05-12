import React from 'react'
import BlockNote from '../components/page/BlockNote'
import { useMatch } from 'react-router-dom'
// import Chat from '../components/page/Chat'

export default function Page() {
  const match = useMatch('/page/:pageId')
  let { pageId } = match.params
  console.log('pageId', pageId)
  return (
    <div>
      <BlockNote></BlockNote>
    </div>
  )
}
