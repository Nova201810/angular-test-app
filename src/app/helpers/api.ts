const camelCase = (key: string): string => key.replace(/_(.{1})/g, (_, part) => part.toUpperCase());
const snakeCase = (key: string): string => key.replace(/([A-Z])/g, '_$1').toLowerCase();

export const camelizeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  }

  if (obj && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      return {
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      };
    }, {});
  }

  return obj;
};

export const snakeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => snakeKeys(v));
  }

  if (obj && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: snakeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};
