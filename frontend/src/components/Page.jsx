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
    />
  )
}
