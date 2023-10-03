import React from 'react';
import { receiveMessage } from './receivePostMessage';
import { ComponentSchema } from '@types';

type UseIframeCommunicatorArgs = {
  registeredComponents: ComponentSchema[] | undefined;
};

export const useIframeCommunicator = ({
  registeredComponents,
}: UseIframeCommunicatorArgs) => {
  React.useEffect(() => {
    if (!registeredComponents) return;

    window.addEventListener(
      'message',
      (e) => receiveMessage(e, registeredComponents),
      false
    );

    return () => {
      window.removeEventListener(
        'message',
        (e) => receiveMessage(e, registeredComponents),
        false
      );
    };
  }, [registeredComponents]);
};
