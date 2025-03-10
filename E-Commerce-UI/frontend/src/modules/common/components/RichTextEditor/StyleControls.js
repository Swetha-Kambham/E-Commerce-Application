import React, { useMemo } from 'react';
import 'draft-js/dist/Draft.css';
import { RichUtils } from 'draft-js';
import PropTypes from 'prop-types';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicSharpIcon from '@material-ui/icons/FormatItalicSharp';
import FormatQuoteSharp from '@material-ui/icons/FormatQuoteSharp';
import FormatListBulletedSharpIcon from '@material-ui/icons/FormatListBulletedSharp';
import { makeStyles, Tabs, Tab } from '@material-ui/core';
import { FlexView } from '../FlexView';
import { StyleIconButton } from './StyleIconButton';
import { tabs } from './enum';

const useTabStyles = makeStyles((theme) => ({
  tabRoot: {
    minWidth: 'unset',
    textTransform: 'none'
  }
}));

const getStyleControls = ({
  editorState,
  toggleInlineType,
  toggleBlockType
}) => [
  {
    id: '1',
    label: 'Bold',
    Icon: <FormatBoldIcon size="small" />,
    onToggle: () => {
      toggleInlineType('BOLD');
    },
    isActive: editorState.getCurrentInlineStyle().has('BOLD'),
    tooltipTitle: 'Add bold text, <Ctrl+b>'
  },
  {
    id: '2',
    label: 'Italic',
    Icon: <FormatItalicSharpIcon size="small" />,
    onToggle: () => {
      toggleInlineType('ITALIC');
    },
    isActive: editorState.getCurrentInlineStyle().has('ITALIC'),
    tooltipTitle: 'Add italic text, <Ctrl+i>'
  },
  {
    id: '3',
    label: 'blockquote',
    Icon: <FormatQuoteSharp size="small" />,
    onToggle: () => {
      toggleBlockType('blockquote');
    },
    isActive: RichUtils.getCurrentBlockType(editorState) === 'blockquote',
    tooltipTitle: 'Add a quote'
  },
  {
    id: '4',
    label: 'unordered-list-item',
    Icon: <FormatListBulletedSharpIcon size="small" />,
    onToggle: () => {
      toggleBlockType('unordered-list-item');
    },
    isActive:
      RichUtils.getCurrentBlockType(editorState) === 'unordered-list-item',
    tooltipTitle: 'Add a bulleted list'
  }
];

export const StyleControls = ({
  editorState,
  toggleInlineType,
  toggleBlockType,
  selectedTab,
  onTabChange
}) => {
  const classes = useTabStyles();

  const styleControls = useMemo(
    () => getStyleControls({ editorState, toggleInlineType, toggleBlockType }),
    [editorState, toggleBlockType, toggleInlineType]
  );

  return (
    <div className="RichEditor-controls">
      <FlexView>
        <Tabs
          value={selectedTab}
          onChange={onTabChange}
          variant="scrollable"
          indicatorColor="primary"
          scrollButtons="off"
        >
          <Tab
            className={classes.tabRoot}
            tabIndex={0}
            label={tabs.write.label}
            value={tabs.write.value}
          />
          <Tab
            className={classes.tabRoot}
            tabIndex={0}
            label={tabs.preview.label}
            value={tabs.preview.value}
          />
        </Tabs>
        <div style={{ marginLeft: 'auto' }}>
          {styleControls.map((control) => (
            <StyleIconButton
              key={control.id}
              isActive={control.isActive}
              onToggle={control.onToggle}
              Icon={control.Icon}
              tooltipTitle={control.tooltipTitle}
            />
          ))}
        </div>
      </FlexView>
    </div>
  );
};

StyleControls.propTypes = {
  editorState: PropTypes.object,
  toggleInlineType: PropTypes.func,
  toggleBlockType: PropTypes.func,
  selectedTab: PropTypes.string,
  onTabChange: PropTypes.func
};
