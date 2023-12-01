'use client';

import React from 'react';
import { RectDataProvider, useRectData } from './rectDataContext';
import { useIframeCommunicator } from './useIframeComunicator';
import clsx from 'clsx';
import { PageContentModel, PageContentRequest } from '@types';
import { useEditorContext } from '../../app/editor/[contentId]/editorContext';

export function Content({ pageContent }: { pageContent: PageContentRequest }) {
  const { state } = useRectData();
  const { state: editorState, dispatch: editorDispatch } = useEditorContext();

  useIframeCommunicator(pageContent);

  const sectionRectData = state.sectionsRectData[0];
  console.log('sectionRectData', state);
  if (!sectionRectData) return null;

  const { top, bottom, left, right, height, width } = sectionRectData.rectData;
  const style = { top, bottom, left, right, height, width };

  return (
    <div
      className={clsx(
        'flex items-center justify-center w-full',
        'absolute top-0 left-0 bottom-0 right-0 overflow-hidden'
      )}
    >
      <div className="absolute border border-red-500" style={style}>
        {state.componentsRectData.map((componentRectData) => {
          const isComponentSelected = editorState.selectedBobComponentId === componentRectData.componentId;
          const { top, bottom, left, right, height, width } = componentRectData.rectData;
          const style = { top, bottom, left, right, height, width };
          return (
            <div
              onClick={() =>
                editorDispatch({
                  type: 'set-selected-bob-component-id',
                  payload: { selectedBobComponentId: componentRectData.componentId },
                })
              }
              key={componentRectData.componentId}
              className={clsx('hover:border border-blue-400', {
                'border border-blue-400': isComponentSelected,
              })}
              style={style}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export function RectLayer({ pageContent }: { pageContent: PageContentRequest }) {
  return (
    <RectDataProvider>
      <Content pageContent={pageContent} />
    </RectDataProvider>
  );
}
