import { BOB } from '../bobInstance';
import { RegisteredComponentSchema } from '../types/bob';
import { PostMessage_ToDashboard_RegisterComponents } from '../types/postMessage';

export function postMessage_registerComponents() {
  const registeredComponents = BOB._customComponents;

  const convertedRegisteredComponents: RegisteredComponentSchema[] =
    registeredComponents.map(({ name, propsSchema }) => ({
      name,
      propsSchema,
    }));

  const newPostMessage: PostMessage_ToDashboard_RegisterComponents = {
    messageType: 'register-components',
    messageData: {
      registeredComponents: convertedRegisteredComponents,
    },
  };

  window.parent.postMessage(newPostMessage, '*');
}
