import { DataFieldSchema } from './dataField';

export type RegisteredComponent = {
  name: string;
  component: any;
  propsSchema: DataFieldSchema[];
};
