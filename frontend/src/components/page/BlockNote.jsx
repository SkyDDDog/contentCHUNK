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
import { BlueButton } from './editor/toolbar/BlueButton'

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
              <BlueButton key={'customButton'} />

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
