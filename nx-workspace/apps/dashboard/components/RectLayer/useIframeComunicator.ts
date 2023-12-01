import React from 'react';
import { receiveMessage } from './receivePostMessage';
import { useRectData } from './rectDataContext';
import { postMessage_pageContentData } from '../iframeCommunicator/postMessage/pageContentData';
import { PageContentModel, PageContentRequest } from '@types';

export const useIframeCommunicator = (pageContent: PageContentRequest) => {
  const { dispatch, state } = useRectData();
  const isReady = state.isIframeReady;

  React.useEffect(() => {
    if (!isReady) return;

    postMessage_pageContentData(pageContent);
  }, [pageContent, isReady]);

  React.useEffect(() => {
    window.addEventListener('message', (e) => receiveMessage(e, dispatch), false);

    return () => {
      window.removeEventListener('message', (e) => receiveMessage(e, dispatch), false);
    };
  }, [dispatch]);
};
