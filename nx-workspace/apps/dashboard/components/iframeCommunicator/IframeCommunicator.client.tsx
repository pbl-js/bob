'use client';
import { ComponentSchema } from '@types';
import { useIframeCommunicator } from './useIframeCommunicator';

export type IFrameComunicator_ClientProps = {
  registeredComponents: ComponentSchema[] | undefined;
};

export const IframeComunicator_Client = ({
  registeredComponents,
}: IFrameComunicator_ClientProps) => {
  useIframeCommunicator({ registeredComponents });

  return null;
};
