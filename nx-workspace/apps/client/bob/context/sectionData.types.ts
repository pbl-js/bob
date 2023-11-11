import React from 'react';
import { PageContent, SectionContent } from '@types';

export interface SectionDataState {
  draft: SectionContent | undefined;
  isComunicationOpen: boolean;
  // registeredComponents: ICustomComponent[];
}

export interface SectionDataContext {
  state: SectionDataState;
  dispatch: React.Dispatch<SectionDataAction>;
}

// Reducer
export enum SectionDataActionEnum {
  OPEN_COMUNICATION = 'open-comunication',
  SET_PAGE_CONTENT = 'set-draft-data',
  // UPDATE_COMPONENT = 'update-component',
  // ADD_COMPONENT = 'add-component',
  // DELETE_COMPONENT = 'delete-component',
}

export interface BuilderSectionDataAction_OpenComunication {
  type: SectionDataActionEnum.OPEN_COMUNICATION;
}

export interface BuilderSectionDataAction_SetPageContent {
  type: SectionDataActionEnum.SET_PAGE_CONTENT;
  payload: {
    pageContent: PageContent;
  };
}

// export interface BuilderSectionDataAction_AddComponent {
//   type: SectionDataActionEnum.ADD_COMPONENT;
//   payload: AddComponentPayload;
// }

// export interface BuilderSectionDataAction_DeleteComponent {
//   type: SectionDataActionEnum.DELETE_COMPONENT;
//   payload: DeleteComponentPayload;
// }

// export interface BuilderSectionDataAction_UpdateComponent {
//   type: SectionDataActionEnum.UPDATE_COMPONENT;
//   payload: UpdateComponentPayload;
// }

export type SectionDataAction =
  | BuilderSectionDataAction_SetPageContent
  | BuilderSectionDataAction_OpenComunication;
// | BuilderSectionDataAction_AddComponent
// | BuilderSectionDataAction_DeleteComponent
// | BuilderSectionDataAction_UpdateComponent;

export type SectionDataDispatch = React.Dispatch<SectionDataAction>;
