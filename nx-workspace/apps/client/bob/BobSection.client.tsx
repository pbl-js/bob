'use client';

import React from 'react';
import { BobSectionProps } from './BobSection';
import { postMessage_registerComponents } from './postMessage/registerComponents';
import { postMessage_sectionRectData } from './postMessage/sectionRectData';
import { SectionDataContextProvider, useSectionData } from './context/sectionData.context';
import { useReceiveDashboardData } from './postMessage/receiveDashboardData';
import { SectionContentRenderer } from './SectionContentRenderer';
import { postMessage_iframeReady } from './postMessage/iframeReady';
import { PageContentRequest } from '@types';

type BobSectionClientProps = {
  name: string;
} & BobSectionProps;

function InnerContent({ draft }: { draft: PageContentRequest }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isComponentsArrayEmpty = draft.components.length === 0;

  React.useEffect(() => {
    const sectionId = draft._id;
    const elementRef = ref.current;

    postMessage_sectionRectData(ref, sectionId);

    const observer = new ResizeObserver(() => {
      postMessage_sectionRectData(ref, sectionId);
    });

    elementRef && observer.observe(elementRef);
    window.addEventListener('scroll', () => postMessage_sectionRectData(ref, sectionId));
    window.addEventListener('resize', () => postMessage_sectionRectData(ref, sectionId));

    return () => {
      elementRef && observer.unobserve(elementRef);
      window.removeEventListener('resize', () => postMessage_sectionRectData(ref, sectionId));
      window.removeEventListener('scroll', () => postMessage_sectionRectData(ref, sectionId));
    };
  }, [draft]);

  return (
    <div
      ref={ref}
      style={
        isComponentsArrayEmpty
          ? { minWidth: '300px', height: '100px', display: 'flex' }
          : { display: 'flex', flexDirection: 'column', alignItems: 'start' }
      }
    >
      <SectionContentRenderer sectionData={draft} />
    </div>
  );
}

const Content = ({ name }: BobSectionClientProps) => {
  const { state } = useSectionData();

  useReceiveDashboardData();

  React.useEffect(() => {
    postMessage_registerComponents();
    postMessage_iframeReady();
  }, []);

  if (!state.draft) return null;

  return <InnerContent draft={state.draft} />;
};

export function BobSectionClient({ name }: BobSectionClientProps) {
  return (
    <SectionDataContextProvider>
      <Content name={name} />
    </SectionDataContextProvider>
  );
}
