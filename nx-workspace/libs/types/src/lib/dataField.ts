export type DataFieldSchema_String = {
  type: 'string';
  name: string;
  defaultValue?: string;
};

export type DataFieldSchema_Number = {
  type: 'number';
  name: string;
  defaultValue?: number;
};

export type DataFieldSchema_Boolean = {
  type: 'boolean';
  name: string;
  defaultValue?: boolean;
};

export type DataFieldSchema_Object = {
  type: 'object';
  name: string;
  subfields: DataFieldSchema[];
  //   defaultSubfields?: DataFieldSchema[];
};

export type DataFieldSchema =
  | DataFieldSchema_String
  | DataFieldSchema_Number
  | DataFieldSchema_Boolean
  | DataFieldSchema_Object;

export type DataFieldSchemaArray = DataFieldSchema[];
