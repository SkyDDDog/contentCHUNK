import React, { useMemo } from 'react'
import BlockNote from '../components/page/BlockNote'
import { useMatch, useNavigate } from 'react-router-dom'
// import { GetPageContentById } from '../api/knowledgeRequest'
import { Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import useMainWidth from '../utils/useMainWidth'
import { setIsPublish } from '../redux/page'
// import { PublishPage } from '../api/weChat'
// import Chat from '../components/page/Chat'

export default function Page() {
  const match = useMatch('/page/:pageId')
  const leftWidth = useSelector((state) => state.sideNav.sideNavWidth)
  const rightWidth = useSelector((state) => state.chat.boxWidth)
  const mainWidth = useMainWidth(leftWidth, rightWidth)
  let { pageId } = match.params
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log('pageId', pageId)
  const activeContent = useSelector((state) => state.page.activePageContent)
  const tabPages = useSelector((state) => state.page.tabPages)
  const activePageId = useSelector((state) => state.page.activePageKey)

  const activePageTitle = useMemo(() => {
    for (let i = 0; i < tabPages.length; i++) {
      if (activePageId == tabPages[i].pageId) {
        return tabPages[i].title
      }
    }

    return 'default'
  }, [activePageId])

  function publishPage() {
    /* {
  "title": "string",
  "author": "string",
  "digest": "string",
  "content": "string",
  "content_source_url": "string",
  "thumb_media_id": "string",
  "need_open_comment": "string",
  "only_fans_can_comment": "string",
  "pic_crop_235_1": "string",
  "pic_crop_1_1": "string"
} */
    console.log('publish')
    navigate('/distribute', {
      replace: false,
      state: {
        title: activePageTitle,
        content: activeContent,
      },
    })
    // 设置store flag
    dispatch(setIsPublish(true))
  }
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        maxWidth: mainWidth + 'px',
      }}
    >
      <div
        className="sendBtn"
        style={{
          position: 'absolute',
          zIndex: 999,
          right: '10px',
          top: '10px',
        }}
      >
        <Button colorScheme="teal" onClick={publishPage}>
          一键发布
        </Button>
      </div>
      <BlockNote></BlockNote>
    </div>
  )
}
