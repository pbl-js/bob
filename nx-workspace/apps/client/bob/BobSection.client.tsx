'use client';

import React from 'react';
import { BobSectionProps } from './BobSection';
import { postMessage_registerComponents } from './postMessage/registerComponents';
import { postMessage_sectionRectData } from './postMessage/sectionRectData';
import { SectionDataContextProvider, useSectionData } from './context/sectionData.context';
import { useReceiveDashboardData } from './postMessage/receiveDashboardData';
import { SectionContentRenderer } from './SectionContentRenderer';

type BobSectionClientProps = {
  name: string;
} & BobSectionProps;

export const Content = ({ name }: BobSectionClientProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { state } = useSectionData();
  console.log('sectionData', state);
  useReceiveDashboardData();

  React.useEffect(() => {
    postMessage_registerComponents();
  }, []);

  React.useEffect(() => {
    console.log('run useeffect bob-section', ref, state.draft);
    if (!state.draft) return;
    const sectionId = state.draft._id;

    // TODO: add some kind of rendering status to avoid this
    setTimeout(() => postMessage_sectionRectData(ref, sectionId), 1000);

    window.addEventListener('scroll', () => postMessage_sectionRectData(ref, sectionId));

    window.addEventListener('resize', () => postMessage_sectionRectData(ref, sectionId));

    return () => {
      window.removeEventListener('resize', () => postMessage_sectionRectData(ref, sectionId));
      window.removeEventListener('scroll', () => postMessage_sectionRectData(ref, sectionId));
    };
  }, [state.draft]);

  if (!state.draft) return null;

  return (
    <div ref={ref}>
      <SectionContentRenderer sectionData={state.draft} />
    </div>
  );
};

export function BobSectionClient({ name }: BobSectionClientProps) {
  return (
    <SectionDataContextProvider>
      <Content name={name} />
    </SectionDataContextProvider>
  );
}
