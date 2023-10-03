import { ComponentSchema } from './bob';

export enum PostMessageType_ToDashboard {
  REGISTER_COMPONENTS = 'register-components',
  SEND_COMPONENT_DOM_DATA = 'send-component-dom-data',
  RENDER_SECTION = 'render-section',
}

export type PostMessage_ToDashboard_RegisterComponents = {
  messageType: PostMessageType_ToDashboard.REGISTER_COMPONENTS;
  messageData: {
    registeredComponents: ComponentSchema[];
  };
};

export type PostMessage_ToDashboard_DoSomething = {
  messageType: PostMessageType_ToDashboard.RENDER_SECTION;
  messageData: {
    test: string;
  };
};

export type PostMessage_ToDashboard =
  | PostMessage_ToDashboard_RegisterComponents
  | PostMessage_ToDashboard_DoSomething;
