'use client';
import { ComponentSchema, PageContentDetails_Response } from '@types';
import React from 'react';
import { receiveMessage } from './receivePostMessage';
import { postMessage_pageContentData } from './postMessage/pageContentData';

export type IFrameComunicator_ClientProps = {
  registeredComponents: ComponentSchema[];
  pageContent: PageContentDetails_Response;
};

export const IframeComunicator_Client = ({
  registeredComponents,
  pageContent,
}: IFrameComunicator_ClientProps) => {
  React.useEffect(() => {
    window.addEventListener('message', (e) => receiveMessage(e, registeredComponents), false);

    return () => {
      window.removeEventListener('message', (e) => receiveMessage(e, registeredComponents), false);
    };
  }, [registeredComponents]);

  React.useEffect(() => {
    postMessage_pageContentData(pageContent);
  }, [pageContent]);

  return null;
};
