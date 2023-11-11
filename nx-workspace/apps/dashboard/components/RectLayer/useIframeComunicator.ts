import React from 'react';
import { receiveMessage } from './receivePostMessage';
import { useRectData } from './rectDataContext';

export const useIframeCommunicator = () => {
  const { dispatch } = useRectData();

  React.useEffect(() => {
    window.addEventListener('message', (e) => receiveMessage(e, dispatch), false);

    return () => {
      window.removeEventListener('message', (e) => receiveMessage(e, dispatch), false);
    };
  }, [dispatch]);
};
