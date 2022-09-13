import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

function MenuBar ({ editor }) {
  if (!editor) {
    return null
  }

  return (
    <div className="tiptap__menubar flex gap-x-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
    </div>
  )
}

function Wysiwyg({ content = '<p>Description...</p>', onBlur = undefined, hasMenubar = true }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    onBlur({ editor }) {
      if (onBlur && typeof onBlur === 'function') {
        onBlur(editor.getHTML())
      }
    }
  })

  return (
    <div className="flex flex-col wysiwyg">
      {hasMenubar && (
        <MenuBar editor={editor} />
      )}
      <EditorContent className="tiptap__editor" editor={editor} />
    </div>
  )
}

export default Wysiwyg;
