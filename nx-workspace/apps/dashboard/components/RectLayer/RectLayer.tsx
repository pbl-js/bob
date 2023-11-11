'use client';

import React from 'react';
import { RectDataProvider, useRectData } from './rectDataContext';
import { useIframeCommunicator } from './useIframeComunicator';
import clsx from 'clsx';

export function Content() {
  const { state } = useRectData();

  useIframeCommunicator();

  const sectionRectData = state.sectionsRectData[0];

  if (!sectionRectData) return null;

  const { top, bottom, left, right, height, width } = sectionRectData.rectData;
  const style = { top, bottom, left, right, height, width };

  return (
    <div
      className={clsx(
        'flex items-center justify-center w-full',
        'absolute top-0 left-0 bottom-0 right-0'
      )}
    >
      <div className="absolute border border-red-500" style={style}></div>
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
