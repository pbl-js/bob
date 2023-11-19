import { PostMessage_ToDashboard, PostMessageType_ToDashboard } from '@types';
import { RectDataDispatch } from './rectDataContext';

export const receiveMessage = async (
  event: MessageEvent<PostMessage_ToDashboard>,
  dispatch: RectDataDispatch
) => {
  if (event.data.messageType === PostMessageType_ToDashboard.SECTION_RECT_DATA) {
    const sectionRectData = event.data.messageData;
    console.log('DASHBOARD: Receive section-rect-data', sectionRectData);
    dispatch({ type: 'add-section-data', payload: sectionRectData });
  }

  if (event.data.messageType === PostMessageType_ToDashboard.COMPONENT_RECT_DATA) {
    const componentRectData = event.data.messageData;
    console.log('DASHBOARD: Receive component-rect-data', componentRectData);
    dispatch({ type: 'add-component-data', payload: componentRectData });
  }
};
