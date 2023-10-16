export type PageContent = {
  name: string;
  fields: any[];
  components: any[];
};

export type PageContentModel = PageContent & {
  _id: string;
};

export type PageContent_GetResponse = PageContentModel[];

export type SectionContent = {
  name: string;
  fields: any[];
  components: any[];
};

export type DataContent = {
  name: string;
  fields: any[];
};
