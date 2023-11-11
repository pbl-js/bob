'use client';

import React from 'react';
import { BobSectionProps } from './BobSection';
import { postMessage_registerComponents } from './postMessage/registerComponents';
import { postMessage_sectionRectData } from './postMessage/sectionRectData';
import { SectionDataContextProvider, useSectionData } from './context/sectionData.context';
import { useReceiveDashboardData } from './postMessage/receiveDashboardData';

type BobSectionClientProps = {
  name: string;
} & BobSectionProps;

export const Content = ({ name }: BobSectionClientProps) => {
  const { state } = useSectionData();
  console.log(state);

  useReceiveDashboardData();

  React.useEffect(() => {
    postMessage_registerComponents();
  }, []);

  React.useEffect(() => {
    // postMessage_sectionRectData();
  }, []);

  return (
    <div style={{ border: '1px solid red' }}>
      <h2>Iosdjfisdjfiosdjfio</h2>
      <div>Siema elo jol jol jol</div>
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
