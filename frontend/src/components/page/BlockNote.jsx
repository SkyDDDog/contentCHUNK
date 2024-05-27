import '@blocknote/core/fonts/inter.css'
import {
  useCreateBlockNote,
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FormattingToolbar,
  FormattingToolbarController,
  ImageCaptionButton,
  NestBlockButton,
  ReplaceImageButton,
  TextAlignButton,
  UnnestBlockButton,
} from '@blocknote/react'
import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/react/style.css'
import '@blocknote/mantine/style.css'
import useMainWidth from '../../utils/useMainWidth'
import { useDispatch, useSelector } from 'react-redux'
import { ExpendButton } from './editor/toolbar/ExpendButton'
import { useEffect /* useMemo */ } from 'react'
import { setActivePageContent, setPageFirstRenderFlag } from '../../redux/page'
import { setAddCount } from '../../redux/chat'
import {
  GetPageContentById,
  UpdatePageContent,
} from '../../api/knowledgeRequest'
import { UploadFileToWx } from '../../api/wechat'
// import { uploadToTmpFilesDotOrg_DEV_ONLY } from '@blocknote/core'
// import { GetPageContentById } from '../../api/knowledgeRequest'

export default function App() {
  const userId = useSelector((state) => state.user.userInfo.id)
  console.log('userId', userId)
  // Creates a new editor instance
  const editor = useCreateBlockNote(
    {
      uploadFile: async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        return new Promise((resolve) => {
          UploadFileToWx(userId, formData).then((res) => {
            console.log('uploadFile', res)
            resolve(res.data.item.image)
          })
        })
      },
    },
    [userId],
  )

  /* 当前Page内容 */
  // const activePageId = useSelector((state) => state.page.activePageKey)
  // let pageContent = useMemo(async () => {
  //   let res = await GetPageContentById(activePageId)
  //   console.log('pageContent', res)
  //   return res
  // }, [activePageId])
  // console.log(pageContent)

  /* 从Chat部分添加内容 */
  const contentToAdd = useSelector((state) => state.chat.contentToAdd)
  const count = useSelector((state) => state.chat.addCount)
  const pageFirstRenderFlag = useSelector(
    (state) => state.page.PageFirstRenderFlag,
  )
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('flag', pageFirstRenderFlag)
    if (pageFirstRenderFlag) {
      dispatch(setPageFirstRenderFlag({ flag: false }))
      return
    }

    if (!contentToAdd) return
    /* 避免组件重新加载的时候添加内容 */
    if (count === 0) return
    /* 获取最后一个块 */
    let lastBlock = editor.document[editor.document.length - 1]
    editor.insertBlocks(
      [
        {
          type: 'paragraph',
          content: contentToAdd,
        },
      ],
      lastBlock,
      'after',
    )
    console.log(editor.document)
    dispatch(setAddCount({ count: count - 1 }))
  }, [count])

  /* layout about */
  const leftWidth = useSelector((state) => state.sideNav.sideNavWidth)
  const rightWidth = useSelector((state) => state.chat.boxWidth)
  const mainWidth = useMainWidth(leftWidth, rightWidth)
  const curPageId = useSelector((state) => state.page.activePageKey)
  const isLogin = useSelector((state) => state.user.isLogin)
  useEffect(() => {
    if (!curPageId) {
      return
    }
    GetPageContentById(curPageId).then(async (res) => {
      let pageHTML = res.data.item.page?.content
        ? res.data.item.page?.content
        : ''
      console.log('getHTML', pageHTML)
      dispatch(setActivePageContent(pageHTML))
      const blocksFromHTML = await editor.tryParseHTMLToBlocks(pageHTML)
      console.log(blocksFromHTML)
      // editor.forEachBlock((block) => {
      //   editor.removeBlocks(block)
      // })
      let lastBlock = editor.document[editor.document.length - 1]
      console.log('last', lastBlock)
      editor.replaceBlocks(editor.document, blocksFromHTML)
    })
  }, [curPageId])
  async function contentChangeHandler() {
    try {
      if (!isLogin) return
      const HTMLFromBlocks = await editor.blocksToHTMLLossy()
      dispatch(setActivePageContent(HTMLFromBlocks))
      console.log('html', HTMLFromBlocks)
      UpdatePageContent(curPageId, HTMLFromBlocks).then(() => {
        console.log('更新page内容', curPageId)
      })
    } catch (error) {
      console.log(error)
    }
  }
  // Renders the editor instance using a React component.
  return (
    <div
      className="editorWrap"
      style={{ width: '100%', height: '100%', maxWidth: mainWidth + 'px' }}
    >
      <BlockNoteView
        editor={editor}
        formattingToolbar={false}
        onChange={contentChangeHandler}
      >
        <FormattingToolbarController
          formattingToolbar={() => (
            <FormattingToolbar>
              <BlockTypeSelect key={'blockTypeSelect'} />

              {/* Extra button to toggle blue text & background */}
              <ExpendButton key={'customButton'} />

              <ImageCaptionButton key={'imageCaptionButton'} />
              <ReplaceImageButton key={'replaceImageButton'} />

              <BasicTextStyleButton
                basicTextStyle={'bold'}
                key={'boldStyleButton'}
              />
              <BasicTextStyleButton
                basicTextStyle={'italic'}
                key={'italicStyleButton'}
              />
              <BasicTextStyleButton
                basicTextStyle={'underline'}
                key={'underlineStyleButton'}
              />
              <BasicTextStyleButton
                basicTextStyle={'strike'}
                key={'strikeStyleButton'}
              />
              {/* Extra button to toggle code styles */}
              <BasicTextStyleButton
                key={'codeStyleButton'}
                basicTextStyle={'code'}
              />

              <TextAlignButton
                textAlignment={'left'}
                key={'textAlignLeftButton'}
              />
              <TextAlignButton
                textAlignment={'center'}
                key={'textAlignCenterButton'}
              />
              <TextAlignButton
                textAlignment={'right'}
                key={'textAlignRightButton'}
              />

              <ColorStyleButton key={'colorStyleButton'} />

              <NestBlockButton key={'nestBlockButton'} />
              <UnnestBlockButton key={'unnestBlockButton'} />

              <CreateLinkButton key={'createLinkButton'} />
            </FormattingToolbar>
          )}
        />
      </BlockNoteView>
    </div>
  )
}
