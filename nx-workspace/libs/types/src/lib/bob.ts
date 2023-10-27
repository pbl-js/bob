import { ComponentType } from 'react';
import { DataFieldSchema } from './dataField';

export type ComponentSchema = {
  name: string;
  propsSchema: DataFieldSchema[];
};

export type ComponentSchemaResponse = {
  _id: string;
  name: string;
  propsSchema: DataFieldSchema[];
};

export type ComponentData = {
  _id: string;
  name: string;
  parentId: string;
};

export type RegisteredComponent = {
  component: ComponentType;
} & ComponentSchema;

export type PageContentAddComponent_Request = {
  componentBlueprintId: string;
  pageContentId: string;
  componentData: ComponentData;
};
