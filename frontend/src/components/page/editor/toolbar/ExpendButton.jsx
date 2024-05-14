import {
  useBlockNoteEditor,
  useComponentsContext,
  // useEditorContentOrSelectionChange,
} from '@blocknote/react'
// import '@blocknote/mantine/style.css'
// import { useState } from 'react'
import { setSelectedText } from '../../../../redux/chat'
import { useDispatch } from 'react-redux'

// Custom Formatting Toolbar Button to toggle blue text & background color.
export function ExpendButton() {
  const editor = useBlockNoteEditor()
  const Components = useComponentsContext()
  const dispatch = useDispatch()

  // Tracks whether the text & background are both blue.
  // const [isSelected, setIsSelected] = useState(
  //   editor.getActiveStyles().textColor === 'blue' &&
  //     editor.getActiveStyles().backgroundColor === 'blue',
  // )

  // // Updates state on content or selection change.
  // useEditorContentOrSelectionChange(() => {
  //   setIsSelected(
  //     editor.getActiveStyles().textColor === 'blue' &&
  //       editor.getActiveStyles().backgroundColor === 'blue',
  //   )
  // }, editor)

  return (
    <Components.FormattingToolbar.Button
      mainTooltip={'Chat with selected text'}
      onClick={() => {
        const slectedText = editor.getSelectedText()
        console.log('selectedText', slectedText)
        dispatch(setSelectedText({ text: '扩写: ' + slectedText }))
        // editor.toggleStyles({
        //   textColor: 'blue',
        //   backgroundColor: 'blue',
        // })
      }}
      // isSelected={isSelected}
    >
      扩写
    </Components.FormattingToolbar.Button>
  )
}
