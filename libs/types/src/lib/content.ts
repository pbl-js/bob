import { ObjectId } from 'mongodb';
import { DataFieldContentArray } from './dataField';

export type ComponentContent = {
  _id: string;
  componentBlueprintId: string;
  props: DataFieldContentArray;
  parentId: string;
  order: number;
  name: string;
};

export type ComponentContentModel = {
  _id: ObjectId;
  componentBlueprintId: string;
  props: DataFieldContentArray;
  parentId: string;
  order: number;
  name: string;
};

export type PageContent = {
  name: string;
  fields: any[];
  components: ComponentContent[];
};

export type PageContentModel = {
  _id: ObjectId;
  name: string;
  fields: any[];
  components: ComponentContentModel[];
};

export type PageContentRequest = PageContent & {
  _id: string;
};

// TODO: Omit components
export type PageContent_GetResponse = PageContentRequest[];

export type PageContentDetails_Response = PageContentRequest;

export type SectionContent = {
  name: string;
  fields: any[];
  components: ComponentContent[];
};

export type DataContent = {
  name: string;
  fields: any[];
};
