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
import { useSelector } from 'react-redux'
import { ExpendButton } from './editor/toolbar/ExpendButton'
import { useEffect } from 'react'

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
        content: 'Select some text to try them out',
      },
      {
        type: 'paragraph',
      },
    ],
  })
  /*  editor.insertBlocks([{ id: '1', type: 'paragraph', text: '123' }]) */

  /* 从Chat部分添加内容 */
  const contentToAdd = useSelector((state) => state.chat.contentToAdd)
  const count = useSelector((state) => state.chat.addCount)
  useEffect(() => {
    console.log('123123123contentToAdd', contentToAdd)
    /* 获取最后一个块 */
    let lastBlock = editor.document[editor.document.length - 1]
    console.log(lastBlock)
    console.log(editor.document)
    if (!contentToAdd) return
    console.log('123123123123')
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
