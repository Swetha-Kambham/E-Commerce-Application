import React, { useCallback, useState, useRef, useEffect } from 'react';
import 'draft-js/dist/Draft.css';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { tabs } from './enum';
import { StyleControls } from './StyleControls';

const maxDepth = 4;

const useEditorStyles = makeStyles((theme) => ({
  root: {},
  contentRoot: {
    border: `1px solid #ddd`,
    cursor: 'text',
    fontSize: theme.spacing(2),
    padding: theme.spacing(1.5),
    minHeight: theme.spacing(15),
    borderRadius: theme.spacing(1)
  },
  readOnly: {
    cursor: 'default'
  }
}));

export const RichTextEditor = ({ rawContent, focus = true, onValueChange }) => {
  const classes = useEditorStyles();
  const [selectedTab, setSelectedTab] = useState(tabs.write.value);
  const onTabChange = useCallback((event, newValue) => {
    setSelectedTab(newValue);
  }, []);
  const [editorState, setEditorState] = useState(() => {
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
  });
  const editorRef = useRef();

  useEffect(() => {
    if (focus && editorRef && editorRef.current && editorRef.current.focus) {
      focus && editorRef.current.focus();
    }
  }, [focus]);

  const onChange = useCallback(
    (es) => {
      if (es) {
        setEditorState(es);
        if (onValueChange) {
          onValueChange(JSON.stringify(convertToRaw(es.getCurrentContent())));
        }
      }
    },
    [onValueChange]
  );

  const onFocus = useCallback(() => {
    editorRef.current.focus();
  }, []);

  const handleKeyCommand = useCallback(
    (command) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        onChange(newState);
        return true;
      }
      return false;
    },
    [editorState, onChange]
  );

  const onTab = useCallback(
    (e) => {
      onChange(RichUtils.onTab(e, editorState, maxDepth));
    },
    [editorState, onChange]
  );

  const toggleBlockType = useCallback(
    (blockType) => {
      onChange(RichUtils.toggleBlockType(editorState, blockType));
      editorRef.current.focus();
    },
    [editorState, onChange]
  );

  const toggleInlineType = useCallback(
    (blockType) => {
      onChange(RichUtils.toggleInlineStyle(editorState, blockType));
      editorRef.current.focus();
    },
    [editorState, onChange]
  );

  if (!editorState) {
    return <h3 className="loading">Loading...</h3>;
  }

  return (
    <>
      <div className={classes.root}>
        <StyleControls
          editorState={editorState}
          toggleBlockType={toggleBlockType}
          toggleInlineType={toggleInlineType}
          selectedTab={selectedTab}
          onTabChange={onTabChange}
        />
        <div
          className={clsx(
            classes.contentRoot,
            selectedTab === tabs.preview.value && classes.readOnly
          )}
          role="presentation"
          onClick={onFocus}
        >
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onChange}
            onTab={onTab}
            ref={editorRef}
            spellCheck
            readOnly={selectedTab === tabs.preview.value}
          />
        </div>
      </div>
    </>
  );
};

RichTextEditor.propTypes = {
  rawContent: PropTypes.string,
  focus: PropTypes.bool,
  onValueChange: PropTypes.func
};

export default RichTextEditor;
