export type DataFieldSchema_String = {
  type: string;
  name: string;
  value: string;
  defaultValue: string;
};

export type DataFieldSchema_Number = {
  type: number;
  name: string;
  value: number;
  defaultValue: number;
};

export type DataFieldSchema_Boolean = {
  type: boolean;
  name: string;
  value: boolean;
  defaultValue: boolean;
};

export type DataFieldSchema_Object = {
  type: object;
  name: string;
  value: DataFieldSchema_Object;
  defaultValue: DataFieldSchema_Object;
};

export type DataFieldSchema =
  | DataFieldSchema_String
  | DataFieldSchema_Number
  | DataFieldSchema_Boolean
  | DataFieldSchema_Object;
