export class ArrayUtils {
  static concatToObject<T>(array: T[]) {
    return array.reduce((prev: { [index: string]: any }, curr) => {
      Object.entries(curr).forEach(([k, v]) => {
        (prev[k] = prev[k] || []).push(v);
      });
      return prev;
    }, {});
  }

  static flattenObject<T>(array: T[]) {
    return array.reduce((prev: { [index: string]: any }, value, index) => {
      Object.entries(value).forEach(([k, v]) => {
        const property = `${k}_${index}`;
        prev[property] = v;
      });
      return prev;
    }, {});
  }
}
