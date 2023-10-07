import { DataFieldSchemaArray } from './dataField';

export type PageBlueprint = {
  name: string;
  description: string;
  fieldsSchema: DataFieldSchemaArray;
};

export type SectionBlueprint = {
  name: string;
  description: string;
  fieldsSchema: DataFieldSchemaArray;
};

export type DataBlueprint = {
  name: string;
  description: string;
  fieldsSchema: DataFieldSchemaArray;
};
