'use client';
import { ComponentSchema } from '@types';
import { useIframeCommunicator } from './useIframeCommunicator';
import React from 'react';

export type IFrameComunicator_ClientProps = {
  registeredComponents: ComponentSchema[] | undefined;
};

export const IframeComunicator_Client = ({
  registeredComponents,
}: IFrameComunicator_ClientProps) => {
  useIframeCommunicator({ registeredComponents });

  // React.useEffect(() => {
  //   postMessage_registerComponents();
  // }, []);

  return null;
};
