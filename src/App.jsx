import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSaveClick = () => {
    // Save the editor content to local storage
  };

  const myKeyBindingFn = (e) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const blockText = block.getText();
  
    if (e.keyCode === 32 /* space */) {
      if (blockText.endsWith('#')) {
        return 'editor-header';
      } else if (blockText.endsWith('***')) {
        return 'editor-underline';
      } else if (blockText.endsWith('**')) {
        return 'editor-red-line';
      } else if (blockText.endsWith('*')) {
        return 'editor-bold';
      }
    }
  
    return getDefaultKeyBinding(e);
  };
  const handleKeyCommand = (command) => {
    if (command === 'editor-header') {
      setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
      return 'handled';
    } else if (command === 'editor-bold') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
      return 'handled';
    } else if (command === 'editor-red-line') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
      return 'handled';
    } else if (command === 'editor-underline') {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
      return 'handled';
    }

    return 'not-handled';
  };

  return (
    <div className="p-4">
   <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">Draft js demo</h2>
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleEditorChange(RichUtils.toggleBlockType(editorState, 'header-one'))}>
          Heading
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))}>Bold</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'))}>
          Red Line
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))}>
          Underline
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSaveClick}>Save</button>
      </div>
      <div className="border border-gray-300 min-h-[200px] p-4">
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
        />
      </div>
    </div>
  );
};

export default App;
