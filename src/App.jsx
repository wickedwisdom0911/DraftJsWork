import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

const App = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedData = localStorage.getItem("editorData");
    if (savedData) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(savedData)),
      );
    } else {
      return EditorState.createEmpty();
    }
  });

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSaveClick = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateJSON = convertToRaw(contentState);
    localStorage.setItem("editorData", JSON.stringify(contentStateJSON));
  };

  const handleHashButtonClick = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-500">
        Draft.js Demo
      </h2>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleHashButtonClick}
        >
          Insert Heading (#)
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded ml-2"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
      <div className="border border-gray-300 min-h-[200px] p-4">
        <Editor editorState={editorState} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default App;
