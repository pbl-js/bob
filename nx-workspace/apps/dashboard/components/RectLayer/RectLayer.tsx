'use client';

import React, { useRef } from 'react';
import { RectDataProvider, useRectData } from './rectDataContext';
import { useIframeCommunicator } from './useIframeComunicator';
import clsx from 'clsx';
import { ComponentSchemaResponse, PageContentRequest } from '@types';
import { RectComponent } from './RectComponent';
import { notEmpty } from '../../utils/notEmpty';
import { DroppableSection } from './DroppableSection';

export function Content({
  pageContent,
  registeredComponents,
}: {
  pageContent: PageContentRequest;
  registeredComponents: ComponentSchemaResponse[];
}) {
  const { state } = useRectData();

  useIframeCommunicator(pageContent);

  const sectionRectData = state.sectionsRectData[0];

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: Event) => {
    console.log(e);
  };

  React.useEffect(() => {
    console.log('wrapperRef: ', wrapperRef);
    wrapperRef.current?.addEventListener('scroll', handleScroll);

    return wrapperRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  if (!sectionRectData) return null;

  // Why this is necessary?
  // Because of: when component is deleted we still have its information inside componentsRectData.
  // We can handle it by filtering fith details data, or add postMessage action for deleting components
  const matchedComponentsRectData = state.componentsRectData.filter((componentRectData) =>
    pageContent.components.some((pageContentComponent) => componentRectData.componentId === pageContentComponent._id)
  );

  const matchedComponentsRectDataWithOrder = matchedComponentsRectData
    .map((i) => {
      const pageContentMatchComponent = pageContent.components.find((component) => component._id === i.componentId);
      if (!pageContentMatchComponent) return null;

      return {
        ...i,
        order: pageContentMatchComponent.order,
      };
    })
    .filter(notEmpty);

  const matchedComponentsRectDataSorted = [...matchedComponentsRectDataWithOrder].sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });

  const { top, bottom, left, right, height, width } = sectionRectData.rectData;
  const style = { top, bottom, left, right, height, width };

  const emptyComponentsArray = matchedComponentsRectDataSorted.length === 0;

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        'flex items-center justify-center w-full',
        'absolute top-0 left-0 bottom-0 right-0 overflow-hidden'
      )}
    >
      {emptyComponentsArray ? (
        <DroppableSection rectData={sectionRectData.rectData} pageContent={pageContent} />
      ) : (
        <div className={clsx('absolute')} style={style}>
          {matchedComponentsRectDataSorted.map((componentRectData) => {
            const matchComponent = pageContent.components.find((item) => item._id === componentRectData.componentId);

            if (!matchComponent) return null;

            const registeredComponent = registeredComponents.find(
              (item) => item._id === matchComponent.componentBlueprintId
            );

            if (!registeredComponent) return null;

            return (
              <RectComponent
                key={componentRectData.componentId}
                pageContentId={pageContent._id}
                pageContent={pageContent}
                registeredComponent={registeredComponent}
                componentRectData={componentRectData}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export function RectLayer({
  pageContent,
  registeredComponents,
}: {
  pageContent: PageContentRequest;
  registeredComponents: ComponentSchemaResponse[];
}) {
  return (
    <RectDataProvider>
      <Content pageContent={pageContent} registeredComponents={registeredComponents} />
    </RectDataProvider>
  );
}
