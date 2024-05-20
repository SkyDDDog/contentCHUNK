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
import { setPageFirstRenderFlag } from '../../redux/page'
import { setAddCount } from '../../redux/chat'
// import { GetPageContentById } from '../../api/knowledgeRequest'

export default function App() {
  // Creates a new editor instance
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'paragraph',
        content: 'Welcome to this demo!',
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'You can now toggle ',
            styles: {},
          },
          {
            type: 'text',
            text: 'blue',
            styles: { textColor: 'blue', backgroundColor: 'blue' },
          },
          {
            type: 'text',
            text: ' and ',
            styles: {},
          },
          {
            type: 'text',
            text: 'code',
            styles: { code: true },
          },
          {
            type: 'text',
            text: ' styles with new buttons in the Formatting Toolbar',
            styles: {},
          },
        ],
      },
      {
        type: 'paragraph',
        content: 'https://t7.baidu.com/it/u=954153296,2797898137&fm=193&f=GIF',
      },
      {
        type: 'paragraph',
      },
    ],
  })
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

  // Renders the editor instance using a React component.
  return (
    <div
      className="editorWrap"
      style={{ width: '100%', height: '100%', maxWidth: mainWidth + 'px' }}
    >
      <BlockNoteView editor={editor} formattingToolbar={false}>
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
