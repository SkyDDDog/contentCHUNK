import React from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from '../utils/editorTool'
import DragDrop from 'editorjs-drag-drop'
export default function Page() {
  const editorCore = React.useRef(null)
  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance
  }, [])
  const handleReady = () => {
    const editor = editorCore.current._editorJS
    new DragDrop(editor)
  }
  const ReactEditorJS = createReactEditorJS()
  return (
    <ReactEditorJS
      onInitialize={handleInitialize}
      onReady={handleReady}
      tools={EDITOR_JS_TOOLS}
      /* autofocus={true} */
      placeholder="Start typing..."
      /* Data to render on Editor start */
      data={{
        time: 1552744582955,
        blocks: [
          {
            type: 'image',
            data: {
              url: 'https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg',
            },
          },
        ],
        version: '2.11.10',
      }}
    />
  )
}
