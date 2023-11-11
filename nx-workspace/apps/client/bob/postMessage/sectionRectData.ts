import { PostMessageType_ToDashboard, PostMessage_ToDashboard_SectionRectData } from '@types';

export const postMessage_sectionRectData = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  sectionId: string
) => {
  const domData = ref.current?.getBoundingClientRect();

  if (!domData) return;

  const newPostMessage: PostMessage_ToDashboard_SectionRectData = {
    messageType: PostMessageType_ToDashboard.SECTION_RECT_DATA,
    messageData: {
      sectionId: sectionId,
      domData: {
        bottom: domData.bottom,
        top: domData.top,
        left: domData.left,
        right: domData.right,
        height: domData.height,
        width: domData.width,
        x: domData.x,
        y: domData.y,
      },
    },
  };

  return window.parent.postMessage(newPostMessage, '*');
};
