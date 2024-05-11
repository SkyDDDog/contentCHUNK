import '@blocknote/core/fonts/inter.css'
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react'
import '@blocknote/react/style.css'
import useMainWidth from '../../utils/useMainWidth'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
export default function App() {
  // Creates a new editor instance
  const editor = useCreateBlockNote({
    /*  initialContent: [
      {
        type: 'paragraph',
        content: 'Welcome to this demo!',
      },
      {
        type: 'paragraph',
        content: "You'll see that the text is now blue",
      },
      {
        type: 'paragraph',
        content:
          "Press the '/' key - the hovered Slash Menu items are also blue",
      },
      {
        type: 'paragraph',
      },
    ], */
  })
  const leftWidth = useSelector((state) => state.sideNav.sideNavWidth)
  const rightWidth = useSelector((state) => state.chat.boxWidth)
  const mainWidth = useMainWidth(leftWidth, rightWidth)

  useEffect(() => {
    console.log('mainWidth', mainWidth)
  }, [mainWidth])

  // Renders the editor instance using a React component.
  return (
    <div
      className="editorWrap"
      style={{ width: '100%', height: '100%', maxWidth: mainWidth + 'px' }}
    >
      <BlockNoteView editor={editor} />
    </div>
  )
}
