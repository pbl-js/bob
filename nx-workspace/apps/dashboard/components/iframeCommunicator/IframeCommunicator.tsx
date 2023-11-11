import React from 'react';
import { IframeComunicator_Client } from './IframeCommunicator.client';
import { getRegisteredComponents } from '../../utils/api/fetchers';

export const IframeComunicator = async () => {
  const registeredComponents = await getRegisteredComponents();

  return <IframeComunicator_Client registeredComponents={registeredComponents} />;
};
