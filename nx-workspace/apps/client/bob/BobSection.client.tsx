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
    console.log('run useeffect bob-section', draft);
    const sectionId = draft._id;

    // TODO: add some kind of rendering status to avoid this
    // setTimeout(() => postMessage_sectionRectData(ref, sectionId), 1000);
    postMessage_sectionRectData(ref, sectionId);

    window.addEventListener('scroll', () => postMessage_sectionRectData(ref, sectionId));

    window.addEventListener('resize', () => postMessage_sectionRectData(ref, sectionId));

    return () => {
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
  const bobComponents = BOB._customComponents;

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
