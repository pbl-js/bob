'use client';

import React from 'react';
import { BobSectionProps } from './BobSection';
import { postMessage_registerComponents } from './postMessage/registerComponents';

type BobSectionClientProps = {
  name: string;
} & BobSectionProps;

export const BobSectionClient = ({ name }: BobSectionClientProps) => {
  React.useEffect(() => {
    postMessage_registerComponents();
  }, []);

  return (
    <div>
      <h2>Iosdjfisdjfiosdjfio</h2>
      <div>Siema elo jol jol jol</div>
    </div>
  );
};
