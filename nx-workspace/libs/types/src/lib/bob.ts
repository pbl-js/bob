import { ComponentType } from 'react';
import { DataFieldSchema } from './dataField';

export type RegisteredComponentSchema = {
  name: string;
  propsSchema: DataFieldSchema[];
};

export type RegisteredComponent = {
  component: ComponentType;
} & RegisteredComponentSchema;
