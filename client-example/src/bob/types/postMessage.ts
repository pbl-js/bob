import { RegisteredComponentSchema } from './bob';

type RegisterComponent = 'register-components';
type DoSomething = 'do-something';

export type PostMessageType_ToDashboard = RegisterComponent | DoSomething;

export type PostMessage_ToDashboard_RegisterComponents = {
  messageType: RegisterComponent;
  messageData: {
    registeredComponents: RegisteredComponentSchema[];
  };
};

export type PostMessage_ToDashboard_DoSomething = {
  messageType: DoSomething;
  messageData: {
    test: string;
  };
};
