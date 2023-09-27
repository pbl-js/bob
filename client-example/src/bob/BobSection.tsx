import React, { useEffect } from 'react';
import { BobSectionClient } from './BobSection.client';

export type BobSectionProps = {
  name: string;
};

export const BobSection = ({ name }: BobSectionProps) => {
  // useEffect(() => {
  //   console.log('siema');
  // });

  return <BobSectionClient name={name} />;
};
