import { ComponentType } from 'react';
import { DataFieldSchema } from './dataField';

export type ComponentSchema = {
  name: string;
  propsSchema: DataFieldSchema[];
};

export type RegisteredComponent = {
  component: ComponentType;
} & ComponentSchema;
