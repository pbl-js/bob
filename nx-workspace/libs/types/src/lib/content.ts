export type PageContent = {
  name: string;
  fields: any[];
  components: any[];
};

export type PageContent_GetRequest = (PageContent & {
  _id: string;
})[];

export type SectionContent = {
  name: string;
  fields: any[];
  components: any[];
};

export type DataContent = {
  name: string;
  fields: any[];
};
