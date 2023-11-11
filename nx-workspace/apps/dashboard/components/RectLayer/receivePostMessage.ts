import { PostMessage_ToDashboard, PostMessageType_ToDashboard } from '@types';
import { RectDataDispatch } from './rectDataContext';

export const receiveMessage = async (
  event: MessageEvent<PostMessage_ToDashboard>,
  dispatch: RectDataDispatch
) => {
  if (event.data.messageType === PostMessageType_ToDashboard.SECTION_RECT_DATA) {
    const sectionRectData = event.data.messageData;

    dispatch({ type: 'add-section-data', payload: sectionRectData });
  }
};
