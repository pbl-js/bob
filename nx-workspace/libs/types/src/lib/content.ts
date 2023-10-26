export type PageContent = {
  name: string;
  fields: any[];
  components: any[];
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
  components: any[];
};

export type DataContent = {
  name: string;
  fields: any[];
};
