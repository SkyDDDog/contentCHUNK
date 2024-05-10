import '@blocknote/core/fonts/inter.css'
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react'
import '@blocknote/react/style.css'

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

  // Renders the editor instance using a React component.
  return (
    <div className="editorWrap" style={{ width: '100%', height: '100%' }}>
      <BlockNoteView editor={editor} />
    </div>
  )
}
