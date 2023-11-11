// import {
//   IDraftComponentData,
//   PostMessageType_ToDashboard,
//   PostMessage_ToDashboard_SendComponentDomData,
// } from '@bob-types';
// import { useEffect } from 'react';
// import useMeasure, { UseMeasureRef } from 'react-use/lib/useMeasure';
// import { useBuilderSectionData } from '../context/builderSectionData.context';

// export const useSendComponentDataToDashboard = (
//   componentData: IDraftComponentData
// ): UseMeasureRef<HTMLDivElement> => {
//   const [ref, refData] = useMeasure<HTMLDivElement>();
//   const {
//     state: { isComunicationOpen },
//   } = useBuilderSectionData();

//   useEffect(() => {
//     if (refData && isComunicationOpen) {
//       const { top, bottom, left, right, x, y, width, height } = refData;
//       const domData = { top, bottom, left, right, x, y, width, height };

//       const newPostMessage: PostMessage_ToDashboard_SendComponentDomData = {
//         messageType: PostMessageType_ToDashboard.SEND_COMPONENT_DOM_DATA,
//         messageData: {
//           componentId: componentData.id,
//           domData: domData,
//         },
//       };

//       window.parent.postMessage(newPostMessage, '*');
//     }
//   }, [refData, componentData.id, isComunicationOpen]);

//   return ref;
// };
