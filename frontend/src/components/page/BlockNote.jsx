import '@blocknote/core/fonts/inter.css'
import { BlockNoteView, useCreateBlockNote } from '@blocknote/react'
import '@blocknote/react/style.css'
import useMainWidth from '../../utils/useMainWidth'
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
在我的觉员任期内，我深刻认识到自己所肩负的责任和义务。我始终以觉员的标准严格要求自己，将党组织的建议作为自己的行动指南。我不断加强政治理论修养，积极参与廉洁自律的实践，努力提高服务质量和行政效率。
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
