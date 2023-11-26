import { DataFieldContentArray } from '../../../libs/types/src';

export function genPropsFromContent(propsRaw: DataFieldContentArray) {
  return propsRaw.reduce((acc, val) => {
    if (val.type === 'string') {
      return {
        ...acc,
        [val.name]: val.value,
      };
    }

    if (val.type === 'number') {
      return {
        ...acc,
        [val.name]: val.value,
      };
    }

    if (val.type === 'boolean') {
      return {
        ...acc,
        [val.name]: val.value,
      };
    }

    return acc;
  }, {});
}
