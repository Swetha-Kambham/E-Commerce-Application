import React, { useRef, useMemo } from 'react';
import 'draft-js/dist/Draft.css';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import PropTypes from 'prop-types';

export const RichText = ({ rawContent }) => {
  const editorState = useMemo(() => {
    let content = null;
    try {
      content = JSON.parse(rawContent);
    } catch (e) {
      //
    }
    if (content && typeof content === 'object') {
      return EditorState.createWithContent(convertFromRaw(content));
    }
    return EditorState.createEmpty();
  }, [rawContent]);
  const editorRef = useRef();

  if (!editorState) {
    return null;
  }

  return (
    <div role="presentation">
      <Editor editorState={editorState} ref={editorRef} spellCheck readOnly />
    </div>
  );
};

RichText.propTypes = {
  rawContent: PropTypes.string
};

export default RichText;
