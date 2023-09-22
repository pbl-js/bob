export type DataFieldString = {
  name: string;
  value: string;
  defaultValue: string;
};

export type DataFieldNumber = {
  name: string;
  value: number;
  defaultValue: number;
};

export type DataFieldBoolean = {
  name: string;
  value: boolean;
  defaultValue: boolean;
};

export type DataFieldObject = {
  name: string;
  value: DataFieldObject;
  defaultValue: DataFieldObject;
};

export type DataField =
  | DataFieldString
  | DataFieldNumber
  | DataFieldBoolean
  | DataFieldObject;
