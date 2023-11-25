import { DataFieldContentArray, DataFieldSchemaArray } from '@types';
import { notEmpty } from './notEmpty';

export function genDefaultProps(propsSchema: DataFieldSchemaArray): DataFieldContentArray {
  return propsSchema
    .map((propSchema) => {
      console.log('propSchema', propSchema);
      if (propSchema.type === 'string') {
        if (propSchema.defaultValue === undefined) return undefined;

        return {
          name: propSchema.name,
          type: propSchema.type,
          value: propSchema.defaultValue,
        };
      }

      if (propSchema.type === 'number') {
        if (propSchema.defaultValue === undefined) return undefined;

        return {
          name: propSchema.name,
          type: propSchema.type,
          value: propSchema.defaultValue,
        };
      }

      if (propSchema.type === 'boolean') {
        if (propSchema.defaultValue === undefined) return undefined;

        return {
          name: propSchema.name,
          type: propSchema.type,
          value: propSchema.defaultValue,
        };
      }

      if (propSchema.type === 'object') {
        return {
          name: propSchema.name,
          type: propSchema.type,
          subfields: [],
        };
      }
    })
    .filter(notEmpty);
}
