import { DataFieldContentArray } from './dataField';

export type ComponentContent = {
  _id: string;
  componentBlueprintId: string;
  props: DataFieldContentArray;
  parentId: string;
  name: string;
};

export type PageContent = {
  name: string;
  fields: any[];
  components: ComponentContent[];
};

export type PageContentModel = PageContent & {
  _id: string;
};

// TODO: Omit components
export type PageContent_GetResponse = PageContentModel[];

export type PageContentDetails_Response = PageContentModel;

export type SectionContent = {
  name: string;
  fields: any[];
  components: ComponentContent[];
};

export type DataContent = {
  name: string;
  fields: any[];
};
