'use client';

import React from 'react';
import { RectDataProvider, useRectData } from './rectDataContext';
import { useIframeCommunicator } from './useIframeComunicator';
import clsx from 'clsx';
import { PageContentModel, PageContentRequest } from '@types';
import { useEditorContext } from '../../app/editor/[contentId]/editorContext';
import { RectComponent } from './RectComponent';

export function Content({ pageContent }: { pageContent: PageContentRequest }) {
  const { state } = useRectData();

  useIframeCommunicator(pageContent);

  const sectionRectData = state.sectionsRectData[0];

  if (!sectionRectData) return null;

  // Why this is necessary?
  // Because of: when component is deleted we still have its information inside componentsRectData.
  // We can handle it by filtering fith details data, or add postMessage action for deleting components
  const matchedComponentsRectData = state.componentsRectData.filter((componentRectData) =>
    pageContent.components.some((pageContentComponent) => componentRectData.componentId === pageContentComponent._id)
  );

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
        {matchedComponentsRectData.map((componentRectData) => (
          <RectComponent key={componentRectData.componentId} componentRectData={componentRectData} />
        ))}
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
