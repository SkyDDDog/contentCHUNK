import React from 'react'
import BlockNote from '../components/page/BlockNote'
import { useMatch } from 'react-router-dom'
import { GetPageContentById } from '../api/knowledgeRequest'
// import Chat from '../components/page/Chat'

export default function Page() {
  const match = useMatch('/page/:pageId')
  let { pageId } = match.params
  console.log('pageId', pageId)
  GetPageContentById(pageId).then((res) => {
    console.log('pageContent', res)
  })
  return (
    <div>
      <BlockNote></BlockNote>
    </div>
  )
}
