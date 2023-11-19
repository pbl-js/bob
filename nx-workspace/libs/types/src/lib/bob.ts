import { ComponentType } from 'react';
import { DataFieldSchema } from './dataField';
import { Omit2 } from './helpers';
import { LoadableComponent } from 'next/dynamic';

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
  component: LoadableComponent;
} & ComponentSchema;

export type PageContentAddComponent_Request = {
  componentBlueprintId: string;
  pageContentId: string;
  componentData: Omit2<ComponentData, '_id'>;
};
