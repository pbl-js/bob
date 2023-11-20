'use client';

import React from 'react';
import { BobSectionProps } from './BobSection';
import { postMessage_registerComponents } from './postMessage/registerComponents';
import { postMessage_sectionRectData } from './postMessage/sectionRectData';
import { SectionDataContextProvider, useSectionData } from './context/sectionData.context';
import { useReceiveDashboardData } from './postMessage/receiveDashboardData';
import { SectionContentRenderer } from './SectionContentRenderer';
import { postMessage_iframeReady } from './postMessage/iframeReady';
import { PageContentModel } from '@types';
import { BOB } from './bobInstance';

type BobSectionClientProps = {
  name: string;
} & BobSectionProps;

function InnerContent({ draft }: { draft: PageContentModel }) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const sectionId = draft._id;

    postMessage_sectionRectData(ref, sectionId);

    const observer = new ResizeObserver(() => {
      postMessage_sectionRectData(ref, sectionId);
    });

    ref.current && observer.observe(ref.current);
    window.addEventListener('scroll', () => postMessage_sectionRectData(ref, sectionId));
    window.addEventListener('resize', () => postMessage_sectionRectData(ref, sectionId));

    return () => {
      ref.current && observer.unobserve(ref.current);
      window.removeEventListener('resize', () => postMessage_sectionRectData(ref, sectionId));
      window.removeEventListener('scroll', () => postMessage_sectionRectData(ref, sectionId));
    };
  }, [draft]);

  return (
    <div ref={ref}>
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
