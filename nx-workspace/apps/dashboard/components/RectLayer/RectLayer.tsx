'use client';

import React from 'react';
import { RectDataProvider, useRectData } from './rectDataContext';
import { useIframeCommunicator } from './useIframeComunicator';
import clsx from 'clsx';

export function Content() {
  const { state } = useRectData();

  useIframeCommunicator();

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
          const { top, bottom, left, right, height, width } = componentRectData.rectData;
          const style = { top, bottom, left, right, height, width };
          return <div className="border border-blue-400" style={style}></div>;
        })}
      </div>
    </div>
  );
}

export function RectLayer() {
  return (
    <RectDataProvider>
      <Content />
    </RectDataProvider>
  );
}
